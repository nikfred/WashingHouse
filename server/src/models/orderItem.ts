import mongoose from 'mongoose'
import {IOrderItem} from "../types/types";

const orderItemSchema = new mongoose.Schema<IOrderItem>({
    order_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    service_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Service',
        required: true
    }
})

module.exports = mongoose.model('OrderItem', orderItemSchema);