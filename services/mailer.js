const nodemailer = require('nodemailer');

const sendMAil = async (to, subject, text) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "developerstest12@gmail.com",
            pass: "vnsvhcocsaaeyaou"
        }
    })

    let details = {
        from: "developerstest12@gmail.com",
        to: to,
        subject: subject,
        html: text
    }

    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log("it has an error", err)
        } else {
            console.log("email has send");
        }
    })
}

module.exports = { sendMAil }