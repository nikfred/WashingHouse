import {IService, IWashhouse} from "../types/types";

const Washhouse = require('../models/washhouse')
const WashhouseAndService = require('../models/washhouseAndService')
const serviceService = require('./serviceService')
const fileService = require('./fileService')
const ApiError = require("../error/ApiError");
const WashhouseDto = require("../dtos/washhouseDto");

class WashhouseService {
    async create(address: string, description: string = "", img = null, services: Array<string> = []) {
        if (await Washhouse.findOne({address})) {
            throw ApiError.badRequest('Id already exists')
        }
        const images: Array<string> = []
        if (img) {
            images.push(await fileService.save(img, 'washhouse'))
        }
        const washhouse = await Washhouse.create({address, description, images})
        for (const service_id of services) {
            await serviceService.getOne(service_id)
            await WashhouseAndService.create({washhouse_id: washhouse._id, service_id})
        }
        return washhouse
    }

    async getOne(id: string) {
        const washhouse = await Washhouse.findById(id)
        if (!washhouse) {
            throw ApiError.notFound('Id not found')
        }
        const rawServices = (await WashhouseAndService.find({washhouse_id: id}, "service_id")).map((i: any) => i.service_id)
        const services: Array<IService> = []
        let service
        for (const rawService of rawServices) {
            service = await serviceService.getOne(rawService)
            if (service) {
                service._doc._id = (service._id).toString()
                services.push(service)
            }
            service = null
        }
        return {washhouse: new WashhouseDto(washhouse), services}
    }

    async getAll() {
        return (await Washhouse.find())?.map((i: IWashhouse) => new WashhouseDto(i))
    }

    async remove(id: string) {
        await WashhouseAndService.deleteMany({washhouse_id: id})
        return Washhouse.findByIdAndDelete(id)
    }

    async update(id: string, washhouseData: any, img = null) {
        let washhouse = await Washhouse.findById(id)
        if (!washhouse) {
            throw ApiError.notFound('Id not found')
        }
        washhouseData.removeImg && await fileService.remove(washhouseData.removeImg)
        washhouseData = {
            address: washhouseData.address || washhouse.address,
            description: washhouseData.description || washhouse.description,
            images: washhouse.images.filter((i: string) => i.indexOf(washhouseData.removeImg) === -1)
        }
        if (img) {
            washhouseData.images = [...washhouse.images, await fileService.save(img, 'washhouse')]
        }
        return Washhouse.findOneAndUpdate({_id: id}, washhouseData, {new: true, upsert: true})
    }

    async updateServices(id: string, add: Array<string> = [], remove: Array<string> = []) {
        let {washhouse, services} = await this.getOne(id)
        let service_ids = services.map(i => i._id) //id уже добавленных услуг
        let service
        //добавление
        if (add[0]) {
            for (const service_id of add) {
                //проверка на отсутствие услуги в химчистке
                if (service_ids.indexOf(service_id) === -1) {
                    service = await serviceService.getOne(service_id)
                    //создание связи
                    await WashhouseAndService.create({washhouse_id: id, service_id})
                    services.push(service)
                    service_ids.push(service_id)
                }
            }
        }
        //удаление
        if (remove[0]) {
            for (const service_id of remove) {
                //проверка на существование услуги в химчистке
                if (service_ids.indexOf(service_id) !== -1) {
                    await WashhouseAndService.deleteOne({washhouse_id: id, service_id})
                    //удаление id услуги из временного массива
                    service_ids = service_ids.filter(i => i.indexOf(service_id) === -1)
                }
            }
            //фильтрация от устарелых услуг
            services = services.filter(i => service_ids.indexOf((i._id).toString()) !== -1)
        }
        return {washhouse, services}
    }
}

module.exports = new WashhouseService()