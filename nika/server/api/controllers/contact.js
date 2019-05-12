const nodeMailer = require('nodemailer');

module.exports = {
    sendMail: async (req, res, next) => {
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'hayrapet2013@gmail.com',
                pass: '392175art'
            }
        });
        let content = `Event ${req.body.eventName} date ${req.body.date}`;
        let html = '';
        let mailOptions = {
            from: `${req.body.fullName} ${req.body.email}`, // sender address
            to: 'levonmanukyan91@gmail.com', // list of receivers
            subject: 'NIKA contact form', // Subject line
            // text: content, // plain text body
            html: `${content}<br><br><b>${req.body.text}</b>` // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({success: false});
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.status(200).json({success: true});
        });
    }
};