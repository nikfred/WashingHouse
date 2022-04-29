import mongoose from 'mongoose'
import validator from 'validator'
import {IUser} from "../types/types";

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: (value: string) => {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        default: "",
        trim: true
    },
    lastname: {
        type: String,
        default: "",
        trim: true
    },
    role: {
        type: String,
        enum: {
            values: ['USER', 'ADMIN'],
            message: '{VALUE} is not supported'
        },
        default: 'USER'
    },
    balance: {
        type: Number,
        default: 0
    },
    recoveryCode: {
        type: String,
    },
    recoveryEnding: {
        type: Date
    }
})

module.exports = mongoose.model('User', userSchema);