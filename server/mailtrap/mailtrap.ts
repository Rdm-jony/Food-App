import { htmlResetEmail, htmlResetSuccessEmail } from "./htmlEmail";

const { MailtrapClient } = require("mailtrap");



export const sendMailVerification = async (email: string, verificationCode: string) => {
    const client = new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN,
    });

    const sender = {
        email: "hello@demomailtrap.co",
        name: "Mailtrap Test",
    };
    const recipients = [
        {
            email: "jonydascse@gmail.com",
        }
    ];

    client
        .send({
            from: sender,
            to: recipients,
            subject: "You are awesome!",
            text: "Congrats for sending test email with Mailtrap!",
            category: "Integration Test",
        })
        .then(console.log, console.error);
}
export const sendWelcomeMail = async (email: string, name: string) => {
    const client = new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN,
    });

    const sender = {
        email: "hello@demomailtrap.co",
        name: "Mailtrap Test",
    };
    const recipients = [
        {
            email: "jonydascse@gmail.com",
        }
    ];

    client
        .send({
            from: sender,
            to: recipients,
            subject: "You are welcom!",
            text: "Congrats for sending test email with Mailtrap!",
            category: "Integration Test",
        })
        .then(console.log, console.error);
}

export const sendResetPasswordEmail = async (email: string, resetUrl: string) => {
    const client = new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN,
    });

    const sender = {
        email: "hello@demomailtrap.co",
        name: "Mailtrap Test",
    };
    const recipients = [
        {
            email: "jonydascse@gmail.com",
        }
    ];

    const htmlContent = htmlResetEmail(resetUrl)

    client
        .send({
            from: sender,
            to: recipients,
            subject: "You are welcom!",
            html: htmlContent,
            text: "Congrats for sending test email with Mailtrap!",
            category: "Integration Test",
        })
        .then(console.log, console.error);
}
export const sendResetPassSuccessEmail = async (email: string) => {
    const client = new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN,
    });

    const sender = {
        email: "hello@demomailtrap.co",
        name: "Mailtrap Test",
    };
    const recipients = [
        {
            email: "jonydascse@gmail.com",
        }
    ];

    const htmlContent = htmlResetSuccessEmail()

    client
        .send({
            from: sender,
            to: recipients,
            subject: "You are welcom!",
            html: htmlContent,
            text: "Congrats for sending test email with Mailtrap!",
            category: "Integration Test",
        })
        .then(console.log, console.error);
}

