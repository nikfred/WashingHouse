const jwt = require('jsonwebtoken')
const Token = require('../models/token')

class TokenService {
    generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '3h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            return null
        }
    }

    async saveToken(uid: string, refreshToken: string) {
        return Token.findOneAndUpdate({uid}, {refreshToken}, {new: true, upsert: true});
    }

    async removeToken(refreshToken: string) {
        return Token.deleteOne({refreshToken})
    }

    async findToken(refreshToken: string) {
        return Token.findOne({refreshToken})
    }
}

module.exports = new TokenService()