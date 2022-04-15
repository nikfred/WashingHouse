const mongoose = require('mongoose');

const washhouseSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    images: [String]
})

module.exports = mongoose.model('Washhouse', washhouseSchema);