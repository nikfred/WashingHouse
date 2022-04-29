import mongoose from 'mongoose'
import {IWashhouseAndService} from "../types/types";

const washhouseAndServiceSchema = new mongoose.Schema<IWashhouseAndService>({
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

module.exports = mongoose.model<IWashhouseAndService>('WashhouseAndService', washhouseAndServiceSchema);