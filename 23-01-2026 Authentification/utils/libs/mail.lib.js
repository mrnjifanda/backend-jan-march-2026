const nodemailer = require('nodemailer');

const appName = process.env.APP_NAME;

const smtpConfig = {
    service: process.env.SMTP_SERVICE,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
};

const transporter = nodemailer.createTransport({
    service: smtpConfig.service,
    auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass
    }
});

const sendMail = async (to, subject, text, html = null) => {
    try {
        const mailOptions = {
            to, subject, text,
            from: `"${appName}" <${smtpConfig.user}>`
        };
        
        if (html) mailOptions.html = html;

        const send = await transporter.sendMail(mailOptions);

        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = { sendMail };