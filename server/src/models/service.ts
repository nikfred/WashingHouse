import mongoose from 'mongoose'
import {IService} from "../types/types";

const serviceSchema = new mongoose.Schema<IService>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
})

module.exports = mongoose.model('Service', serviceSchema);