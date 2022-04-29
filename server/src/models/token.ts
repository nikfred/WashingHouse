import mongoose from "mongoose";
import {IToken} from "../types/types";

const tokenSchema = new mongoose.Schema<IToken>({
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Token', tokenSchema);