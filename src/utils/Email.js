
import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config()
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.SMPT_USER_NAME,
        pass: process.env.SMTP_USER_PASS,
    },
})

console.log(process.env.SMPT_USER_NAME)
// async..await is not allowed in global scope, must use a wrapper
const mailer = async (maildata) => {

    try {
        const info = await transporter.sendMail({
            from: process.env.SMPT_USER_NAME,
            to: maildata.email,
            subject: maildata.subject,

            html: maildata.html
        })
    } catch (err) {
        console.log(err.message)
    }
}

export default mailer

