import { SubmitFeedbackService } from "./submit-feedback-service"

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendEmailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {

        await expect(submitFeedback.Execute({
            type: 'BUG',
            comment: 'exemple comment',
            screenshot: 'data:image/png:base64test.png'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendEmailSpy).toHaveBeenCalled();
    });
    it('should not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.Execute({
            type: '',
            comment: 'exemple comment',
            screenshot: 'data:image/png:base64test.png'
        })).rejects.toThrow();
    })
    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.Execute({
            type: 'BUG',
            comment: 'exemple comment',
            screenshot: 'est.png'
        })).rejects.toThrow();
    })
})