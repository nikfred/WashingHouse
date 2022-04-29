import {MyRequest} from "../types/express";
import {NextFunction, Response} from "express";
const orderService = require('../services/orderService')
const ApiError = require('../error/ApiError')

class OrderController {
    async create(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {id} = req.user
            const {washhouse_id, services} = req.body
            if (!washhouse_id || !services[0]) {
                return next(ApiError.badRequest('Not enough parameters'))
            }
            const order = await orderService.create(id, washhouse_id, services)
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getOne(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {id} = req.user
            const {order_id} = req.params
            const order = await orderService.getOneDetail(order_id, id)
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getAllUserOrders(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {id} = req.user
            const orders = await orderService.getAllUserOrders(id)
            return res.json(orders)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async adminGetAllOrders(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const orders = await orderService.adminGetAllOrders()
            return res.json(orders)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async adminGetOne(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {order_id} = req.params
            const order = await orderService.adminGetOneDetail(order_id)
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async adminReady(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {order_id} = req.params
            const order = await orderService.updateStatus(order_id, "ready")
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async adminComplete(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {order_id} = req.params
            const order = await orderService.updateStatus(order_id, "complete")
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async adminCancel(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {order_id} = req.params
            const {reason} = req.body
            const order = await orderService.updateStatus(order_id, "cancel", null, reason)
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async complete(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {id} = req.user
            const {order_id} = req.params
            const order = await orderService.updateStatus(order_id, "complete", id)
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async cancel(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {id} = req.user
            const {order_id} = req.params
            const order = await orderService.updateStatus(order_id, "cancel", id)
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async adminRemoveServices(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {order_id} = req.params
            const {services} = req.body
            if (!services || !services[0]) {
                return res.status(200)
            }
            const order = await orderService.removeServices(order_id, services)
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async updateInfo(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {order_id} = req.params
            const {total, date} = req.body
            const order = await orderService.updateInfo(order_id, {total, date})
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async remove(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {id} = req.user
            const {order_id} = req.params
            const order = await orderService.remove(order_id, id)
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async adminRemove(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const {order_id} = req.params
            const order = await orderService.remove(order_id)
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new OrderController()