import {MyRequest} from "../types/express";
import {NextFunction, Response} from "express";

const userService = require('../services/userService')
const ApiError = require('../error/ApiError')

const checkName = (name: string) => {
    const regex = /\s/
    return name || !name.match(regex)
}

const checkPassword = (password: string) => {
    return password.length <= 18 && password.length >= 8 && checkName(password)
}

class UserController {
    async registration(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {firstname, lastname, email, password} = req.body
            const userData = {firstname, lastname, email}
            if (!checkPassword(password)) {
                return next(ApiError.badRequest('Неверный формат пароля'))
            }
            const user = await userService.registration(userData, password)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async login(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const user = await userService.login(email, password)
            return res.json(user)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async logout(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.body
            if (!refreshToken) {
                return res.status(200)
            }
            await userService.logout(refreshToken)
            return res.status(200)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async refresh(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.body
            if (!refreshToken) {
                return next(ApiError.unauthorized('Unauthorized'))
            }
            const user = await userService.refresh(refreshToken)
            return res.json(user)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getAllClient(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllClient()
            return res.json(users)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getUser(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {id} = req.user
            const users = await userService.getUser(id)
            return res.json(users)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async update(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {id} = req.user
            const {firstname, lastname} = req.body
            const rawProfile = {firstname, lastname}
            const profile = await userService.update(id, rawProfile)
            return res.json(profile)
        } catch (e) {
            next(e)
        }
    }

    async updateRole(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {id, role} = req.body
            const profile = await userService.updateRole(id, role)
            return res.json(profile)
        } catch (e) {
            next(e)
        }
    }

    async recovery(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {email} = req.body
            await userService.recovery(email)
            return res.json("Check your email")
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async updatePassword(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {email, code, password} = req.body
            const user = await userService.updatePassword(email, code, password)
            return res.json(user)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new UserController()