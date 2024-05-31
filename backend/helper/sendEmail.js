const nodemailer = require('nodemailer');
const { congratulationForm } = require('./formHelper');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
}); 

const mailOptions = {
    from: {
        name: 'App nghe nhac',
        address: process.env.EMAIL
    },
    to: 'adamlavie2369@gmail.com',
    subject: 'Test',
    text: 'Hello world',
    html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h1 style="text-align: center; color: #ff6347;">Hello world</h1>
            <p style="font-size: 16px;">This is a test email.</p>
            <div style="background-color: #f2f2f2; padding: 10px; margin: 20px 0;">
                <p style="font-size: 14px;">This is a box with a background color and padding.</p>
            </div>
        </div>
    `
};


const sendMail = async (toAddress, subject, html) => {
    try {
        mailOptions.to = toAddress;
        mailOptions.subject = subject;
        mailOptions.html = html;
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${toAddress} successfully, on subject: ${subject}`);
    } catch (error) {
        console.log(error);
    }
}
//sendMail('adamlavie2369@gmail.com', 'Test', congratulationForm('Adam', 'This is a test email'));

module.exports = { sendMail };
