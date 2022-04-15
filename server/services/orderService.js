const Order = require('../models/order')
const OrderItem = require('../models/orderItem')
const ApiError = require('../error/ApiError')
const washhouseService = require('../services/washhouseService')
const userService = require('../services/userService')
const OrderDto = require('../dtos/orderDto')
const AdminOrderDto = require('../dtos/adminOrderDto')

const userStatuses = Order.schema.tree.status.enum.values
const adminStatuses = Order.schema.tree.adminStatus.enum.values

const allStatuses = {
    processing: [userStatuses[0], adminStatuses[0]],
    ready: [userStatuses[1], adminStatuses[1]],
    complete: [userStatuses[2], adminStatuses[2]],
    cancel: [userStatuses[3], adminStatuses[3]]
}

//проверка на персональность заказа
const checkUid = (uid, order) => {
    if (uid && order.uid.toString().indexOf(uid) === -1) {
        throw ApiError.forbidden("Not your order")
    }
    return !!uid
}

//проверка на неактивность заказа
const checkNotActiveOrder = (order) => {
    if (order.status === allStatuses.complete[0] || order.status === allStatuses.cancel[0]) {
        throw ApiError.forbidden("Order is not active")
    }
}

//проверка на активность заказа
const checkActiveOrder = (order) => {
    if (order.status === allStatuses.complete[0] || order.status === allStatuses.cancel[0]) {
        throw ApiError.forbidden("Order is not active")
    }
}


class OrderService {
    async create(uid, washhouse_id, service_ids) {
        const user = await userService.getUser(uid)
        let {washhouse, services} = await washhouseService.getOne(washhouse_id)
        let total = 0 //стоимость всего заказа
        for (const service_id of service_ids) {
            total += +services.filter(i => (i._id).indexOf(service_id) !== -1)[0].price
            if (+user.balance < total) {
                throw ApiError.badRequest(`Недостаточно средств: Баланс = ${user.balance}; Стоимость = ${total}`)
            }
        }

        await userService.updateBalance(uid, -total)
        const order = await Order.create({uid, washhouse_id, total})
        for (const service_id of service_ids) {
            await OrderItem.create({order_id: order._id, service_id})
        }
        services = services.filter(i => service_ids.indexOf((i._id).toString()) !== -1)
        return {order: new OrderDto({...washhouse._doc, ...order._doc}), services}
    }

    async getAllUserOrders(uid) {
        const rawOrders = await Order.find({uid})
        const orders = []
        for (const rawOrder of rawOrders) {
            orders.push(await this.getOne(rawOrder._id))
        }
        return orders
    }

    async adminGetAllOrders() {
        const rawOrders = await Order.find()
        const orders = []
        let order, user
        for (const rawOrder of rawOrders) {
            order = await this.getOne(rawOrder._id)
            user = await userService.getUser(order.uid)
            const adminStatus = adminStatuses[userStatuses.indexOf(order.status)]
            order = new AdminOrderDto({...user, ...order, _id: order.id, adminStatus})
            orders.push(order)
        }
        return orders
    }

    async getOne(id, uid = null) {
        const order = await Order.findById(id)
        if (!order) {
            throw ApiError.notFound("Order not found")
        }
        checkUid(uid, order)
        const {washhouse} = await washhouseService.getOne(order.washhouse_id)
        return new OrderDto({...washhouse._doc, ...order._doc})
    }

    async getOneDetail(id, uid = null) {
        const order = await this.getOne(id, uid)
        let {services} = await washhouseService.getOne(order.washhouse_id)
        const service_ids = (await OrderItem.find({order_id: id})).map(i => (i.service_id).toString())

        services = services.filter(i => service_ids.indexOf((i._id).toString()) !== -1)
        return {order, services}
    }

    async adminGetOneDetail(id) {
        let {order, services} = await this.getOneDetail(id)
        const user = await userService.getUser(order.uid)
        const adminStatus = adminStatuses[userStatuses.indexOf(order.status)]
        order = new AdminOrderDto({...user, ...order, _id: order.id, adminStatus})
        return {order, services}
    }

    async updateInfo(id, updateData) {
        const order = await Order.findById(id)
        if (!order) {
            throw ApiError.notFound("Order not found")
        }
        updateData = {
            total: updateData.total || order.total,
            date: updateData.date || order.date,
        }
        return Order.findOneAndUpdate({_id: id}, updateData, {new: true, upsert: true})
    }

    async updateStatus(id, status, uid = null, reason = null) {
        const order = await Order.findById(id)
        //проверка на существование статуса
        if (!allStatuses[status]) {
            throw ApiError.notFound("Status not found")
        }
        checkNotActiveOrder(order)
        //объект для обновления информации о заказе
        const updateData = {
            status: allStatuses[status][0],
            adminStatus: allStatuses[status][1]
        }

        const isUser = checkUid(uid, order)
        if (status === "cancel") {
            //пользователю запрещено отменять готовый к выдаче заказ
            if (isUser && order.status === allStatuses.ready[0]) {
                throw ApiError.forbidden("Can't return ready order")
            }
            await userService.updateBalance(order.uid, order.total)
            if (reason) {
                updateData.cancelReason = reason
            }
        } else if (status === "complete") {
            //пользователю запрещено завершать не готовый к выдаче заказ
            if (isUser && order.status !== allStatuses.ready[0]) {
                throw ApiError.forbidden("Order not ready")
            }
        }

        return Order.findOneAndUpdate({_id: id}, updateData, {new: true, upsert: true})
    }

    async removeServices(id, remove = []) {
        let {order, services} = await this.getOneDetail(id)
        checkNotActiveOrder(order)
        //удаление повторяющихся услуг
        remove = [...(new Set(remove))]
        //подсчет возвращаемой суммы
        let refund = services.reduce((sum, i) => {
            return sum + ((remove.indexOf(i._id) !== -1) ? +i.price : 0)
        }, 0)
        refund = refund >= order.total ? order.total : refund
        //удаление услуг из заказа
        await OrderItem.deleteMany({order_id: id, service_id: {$in: remove}})
        //возврат средств
        await userService.updateBalance(order.uid, refund)
        //объект для обновления информации о заказе
        let updateData = {total: (+order.total - refund)}
        //проверка на последнюю услугу
        if (updateData.total <= 0) {
            updateData.status = allStatuses.cancel[0]
            updateData.adminStatus = allStatuses.cancel[1]
            updateData.cancelReason = "Удалены все услуги"
        }
        await Order.updateOne({_id: id}, updateData)
        return this.adminGetOneDetail(id)
    }

    async remove(id, uid = null) {
        console.log(allStatuses)
        const order = await Order.findById(id)
        checkActiveOrder(order)
        checkUid(uid, order)
        await OrderItem.deleteMany({order_id: id})
        return Order.findByIdAndDelete(id)
    }
}

module.exports = new OrderService()