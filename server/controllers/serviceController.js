const serviceService = require('../services/serviceService')
const ApiError = require('../error/ApiError')

class ServiceController {
    async create(req, res, next) {
        try {
            const {name, price} = req.body
            if (!name || !price) {
                return next(ApiError.badRequest('Not enough parameters'))
            }
            const service = await serviceService.create(name, price)
            return res.json(service)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const {service_id} = req.params
            const service = await serviceService.getOne(service_id)
            return res.json(service)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const service = await serviceService.getAll()
            return res.json(service)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {service_id} = req.params
            const {name, price} = req.body
            const service = await serviceService.update(service_id, {name, price})
            return res.json(service)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async remove(req, res, next) {
        try {
            const {service_id} = req.params
            const service = await serviceService.remove(service_id)
            return res.json(service)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new ServiceController()