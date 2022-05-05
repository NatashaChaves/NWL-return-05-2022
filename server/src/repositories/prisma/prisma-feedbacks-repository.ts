import { prisma } from "../../prisma";
import { feedbacksRepository, feedbackCreate } from "../feedbacks-reposistory";

export class PrismaFeedbackRepository implements feedbacksRepository {
    async create({ type, comment, screenshot }: feedbackCreate) {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            }
        })

    }
}