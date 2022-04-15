const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
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