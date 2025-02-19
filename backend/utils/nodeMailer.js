import nodemailer from 'nodemailer';
import nodeMailerConfig from './nodeMailerConfig.js';

const sendEmail = async ({ to, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport(nodeMailerConfig);

        const mailOptions = {
            from: '"Market" <shopPanel4@gmail.com>',
            to,
            subject: subject,
            html: html,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Ошибка при отправке письма', error);
        return { success: false, error: 'Ошибка при отправке письма' };
    }
};

export default sendEmail;
