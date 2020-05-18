const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    service: process.env.MAIL_SERVICE,
    port: process.env.MAIL_PORT,
    secure: true, //SSL or TSL
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
});