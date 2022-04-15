const Service = require('../models/service')
const WashhouseAndService = require('../models/washhouseAndService')
const ApiError = require('../error/ApiError')

class ServiceService{
    async create(name, price) {
        if (await Service.findOne({name})) {
            throw ApiError.badRequest('Service already exists')
        }
        return Service.create({name, price})
    }

    async getOne(id) {
        const service = await Service.findById(id)
        if (!service) {
            throw ApiError.notFound('Service not found')
        }
        return service
    }

    async getAll() {
        return Service.find()
    }

    async remove(id) {
        if (!(await Service.findById(id))) {
            throw ApiError.notFound('Service not found')
        }
        await WashhouseAndService.deleteMany({service_id: id})
        return Service.findByIdAndDelete(id)
    }

    async update(id, serviceData) {
        let service = await Service.findById(id)
        if (!service) {
            throw ApiError.notFound('Service not found')
        }
        serviceData = {
            name: serviceData.name || service.name,
            price: serviceData.price || service.price
        }
        return Service.findOneAndUpdate({_id: id}, serviceData, {new: true, upsert: true})
    }
}

module.exports = new ServiceService()