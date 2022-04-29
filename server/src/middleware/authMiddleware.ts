import {MyRequest} from "../types/express";
import {NextFunction, Response} from "express";

const ApiError = require('../error/ApiError')
const tokenService = require('../services/tokenService')

module.exports = function (req: MyRequest, res: Response, next: NextFunction) {
    try {
        const token: string | undefined = req?.headers?.authorization?.split(' ')[1];
        if (!token) {
            next(ApiError.unauthorized('Пользователь не авторизован'))
        }

        const user = tokenService.validateAccessToken(token)
        if (!user) {
            next(ApiError.unauthorized('Пользователь не авторизован'))
        }

        req.user = user
        console.log(`${user.email} - ${user.role}`);
        next()
    } catch (e) {
        console.log(e)
        next(ApiError.unauthorized('Пользователь не авторизован'))
    }
}