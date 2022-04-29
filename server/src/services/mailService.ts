import {Transporter} from "nodemailer";

const nodemailer = require('nodemailer')

class MailService {
    transporter: Transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendUpdatePasswordMail(to: string, code: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Восстановление пароля аккаунта в сервисе WashingHouse",
            text: `Код для восстановления пароля - ${code}`
        })
    }
}

module.exports = new MailService()