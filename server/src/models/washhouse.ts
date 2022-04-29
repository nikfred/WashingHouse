import mongoose from 'mongoose'
import {IWashhouse} from "../types/types";

const washhouseSchema = new mongoose.Schema<IWashhouse>({
    address: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    images: [String]
})

module.exports = mongoose.model('Washhouse', washhouseSchema);