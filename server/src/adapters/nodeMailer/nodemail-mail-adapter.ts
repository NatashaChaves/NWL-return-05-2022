import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer"


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "84c1a71c534c0b",
        pass: "d3d445418df583"
    }
});

export class NodemailerMailAdapter implements MailAdapter {

    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <equipe@feedget.com>',
            to: 'Natasha Chaves <natashachavessilva@gmail.com>',
            subject,
            html: body
        })
    }
}