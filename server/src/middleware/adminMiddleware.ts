import {MyRequest} from "../types/express";
import {NextFunction, Response} from "express";

const ApiError = require('../error/ApiError')
const User = require('../models/user')

module.exports = async function (req: MyRequest, res: Response, next: NextFunction) {
    try {
        if ((await User.findById(req.user.id)).role !== 'ADMIN') {
            next(ApiError.forbidden('Отказано в доступе'))
        }
        next()
    } catch (e) {
        console.log(e)
        next(ApiError.forbidden('Отказано в доступе'))
    }
}