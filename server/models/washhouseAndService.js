const mongoose = require('mongoose');

const washhouseAndServiceSchema = new mongoose.Schema({
    washhouse_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Washhouse',
        required: true
    },
    service_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Service',
        required: true
    }
})

module.exports = mongoose.model('WashhouseAndService', washhouseAndServiceSchema);