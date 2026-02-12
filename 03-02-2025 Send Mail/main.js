const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'axbzcx@gmail.com',
        pass: 'xxxx xxxx xxx xxx xxxx'
    }
});

transporter.sendMail({
    from: '"My Name" <axbzcx@gmail.com>',
    to: "recipient@example.com",
    subject: "Just to test my email",
    text: "Hello, this is a test email sent using Node.js and Nodemailer!",
    html: "<p>Hello, <a href='https://example.com'>click here</a> to visit our site!</p>"
}).then(info => {
    console.log('Email sent successfully:', info.response); 
}).catch(err => {
    console.error('Error occurred:', err);
});
