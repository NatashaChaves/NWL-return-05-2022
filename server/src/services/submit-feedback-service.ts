import { MailAdapter } from "../adapters/mail-adapter";
import { feedbacksRepository } from "../repositories/feedbacks-reposistory";

interface SubmitFeedbackServiceRequest {
    type: string,
    comment: string,
    screenshot?: string
}

export class SubmitFeedbackService {

    constructor(
        private feedbacksRepository: feedbacksRepository,
        private mailAdapter: MailAdapter
    ) {
    }


    async Execute(request: SubmitFeedbackServiceRequest) {
        const { type, comment, screenshot } = request;

        if (!type || !comment) {
            let error = !type ? 'Type' : 'Comment'
            throw new Error(error + ' is requerid')
        }
        if (screenshot && !screenshot.startsWith('data:image/png:base64')) {
            throw new Error('Invalid screenshot format');
        }
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color:#111">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Tipo do comentário: ${comment}</p>`,
                `</div>`
            ].join('\n')
        })
    }
}