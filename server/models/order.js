const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    washhouse_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Washhouse',
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ['В обработке', 'Выполнен', 'Завершен', 'Возврат'],
            message: '{VALUE} не поддерживается'
        },
        default: 'В обработке'
    },
    adminStatus: {
        type: String,
        enum: {
            values: ['Новый', 'Готов к выдаче', 'Завершен', 'Возврат'],
            message: '{VALUE} не поддерживается'
        },
        default: 'Новый'
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    cancelReason: {
        type: String,
    }

})

module.exports = mongoose.model('Order', orderSchema);