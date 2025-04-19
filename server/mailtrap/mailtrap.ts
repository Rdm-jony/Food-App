const { MailtrapClient } = require("mailtrap");

const TOKEN = "593a6d3bee66a6787767dd731b202bd0";

export const sendMailVerification = async(email: string, verificationCode: string) => {
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
