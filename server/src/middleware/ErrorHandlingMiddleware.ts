import {MyRequest} from "../types/express";
import {Response} from "express";

module.exports = function (err: ApiError, req: MyRequest, res: Response) {
    return res.status(err.status || 500).json({message: err.message || "Непредвиденая ошибка"})
}