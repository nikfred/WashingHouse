const User = require('../models/user')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const tokenService = require('./tokenService')
const mailService = require('./mailService')
const UserDto = require('../dtos/userDto')
const UserProfileDto = require('../dtos/userProfileDto')

const MAX_BALANCE = 500
const MIN_BALANCE = 100

class UserService {
    async registration(userData, password) {
        let user = await User.findOne({email: userData.email})
        if (user) {
            throw ApiError.badRequest("Email is exist")
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const balance = Math.round(Math.random() * (MAX_BALANCE - MIN_BALANCE) + MIN_BALANCE)

        user = await User.create({...userData, password: hashPassword, balance})

        const userDto = new UserDto(user)
        console.log("New User: ")
        console.log(userDto)

        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async login(email, password) {
        let user = await User.findOne({email})
        if (!user) {
            throw ApiError.notFound("User not found")
        }
        const equivalence = await bcrypt.compareSync(password, user.password)
        if (!equivalence) {
            throw ApiError.badRequest('Введен неверный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        return tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        const validateUser = tokenService.validateRefreshToken(refreshToken)
        console.log(validateUser);
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if (!validateUser || !tokenFromDB) {
            throw ApiError.unauthorized('Unauthorized')
        }

        const user = await User.findById(validateUser.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async getUser(id) {
        const user = await User.findById(id)
        if (!user) {
            throw ApiError.notFound('User not found')
        }
        return new UserProfileDto(user)
    }

    async getAllClient() {
        return (await User.find({role: "USER"})).map(i => new UserProfileDto(i))
    }

    async update(id, rawUser) {
        let user = await User.findById(id)
        if (user) {
            rawUser = {
                firstname: rawUser.firstname || user.firstname,
                lastname: rawUser.lastname || user.lastname,
            }
        } else {
            throw ApiError.notFound('User not found')
        }
        console.log("Update User")
        console.log(user);
        user = await User.findOneAndUpdate({_id: id}, rawUser, {upsert: true, new: true})
        return new UserProfileDto(user)
    }

    async updateBalance(id, balance = 0) {
        const user = await this.getUser(id)
        balance = +user.balance + +balance
        if (balance < 0) {
            throw ApiError.badRequest("Not enough money")
        }
        return new UserProfileDto(await User.findOneAndUpdate({_id: id}, {balance}, {new: true, upsert: true}))
    }

    async updateRole(id, role) {
        let user = await User.findById(id)
        if (!user) {
            throw ApiError.notFound('User not found')
        }

        const roles = User.schema.tree.role.enum.values
        if (roles.indexOf(role) === -1) {
            throw ApiError.badRequest('Role not exists')
        }

        user = await User.findOneAndUpdate({_id: id}, {role}, {new: true})
        return new UserProfileDto(user)
    }

    async recovery(email) {
        if (!await User.findOne({email})) {
            throw ApiError.notFound('User not found')
        }
        let recoveryCode
        do {
            recoveryCode = Math.round(Math.random() * (999999 - 100000) + 100000)
        } while (await User.findOne({recoveryCode: recoveryCode}))
        const recoveryEnding = new Date(+new Date() + 5 * 60 * 1000)
        await User.updateOne({email}, {recoveryCode, recoveryEnding})
        await mailService.sendUpdatePasswordMail(email, recoveryCode)
    }

    async updatePassword(email, code, newPassword) {
        let user = await User.findOne({email})
        if (+user.recoveryEnding < +Date.now()) {
            await User.findOneAndUpdate({email}, {recoveryCode: null, recoveryEnding: null})
            throw ApiError.forbidden("Code expired")
        }
        if (user.recoveryCode !== code.toString()) {
            throw ApiError.badRequest("Incorrect code")
        }

        const hash = await bcrypt.hash(newPassword, 5)
        user = await User.findOneAndUpdate(
            {email},
            {password: hash, recoveryCode: null, recoveryEnding: null},
            {upsert: true, new: true}
        )
        return new UserProfileDto(user)
    }
}

module.exports = new UserService()