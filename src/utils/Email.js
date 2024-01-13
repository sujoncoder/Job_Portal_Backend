import nodemailer from 'nodemailer'
import { SMTP_USER_NAME, SMTP_USER_PASSWORD } from '../secret/secret.js';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: SMTP_USER_NAME,
        pass: SMTP_USER_PASSWORD
    },
});

const mailer = async (maildata) => {
    try {
        const info = await transporter.sendMail({
            from: SMTP_USER_NAME,
            to: maildata.email,
            subject: maildata.subject,
            html: maildata.html
        })
    } catch (err) {
        console.log(err.message)
    }
};

export default mailer;