const washhouseService = require('../services/washhouseService')
const ApiError = require('../error/ApiError')

class WashhouseController {
    async create(req, res, next) {
        try {
            const {address, description, services} = req.body
            const img = req?.files?.img
            if (!address) {
                return next(ApiError.badRequest('Not enough parameters'))
            }
            const washhouse = await washhouseService.create(address, description, img, services)
            return res.json(washhouse)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const {washhouse_id} = req.params
            const washhouse = await washhouseService.getOne(washhouse_id)
            return res.json(washhouse)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const washhouse = await washhouseService.getAll()
            return res.json(washhouse)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {washhouse_id} = req.params
            const {address, description, removeImg} = req.body
            const img = req?.files?.img
            console.log(img)
            const washhouse = await washhouseService.update(washhouse_id, {address, description, removeImg}, img)
            return res.json(washhouse)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async remove(req, res, next) {
        try {
            const {washhouse_id} = req.params
            const washhouse = await washhouseService.remove(washhouse_id)
            return res.json(washhouse)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async updateServices(req, res, next) {
        try {
            const {washhouse_id} = req.params
            const {add, remove} = req.body
            const washhouse = await washhouseService.updateServices(washhouse_id, add, remove)
            return res.json(washhouse)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new WashhouseController()