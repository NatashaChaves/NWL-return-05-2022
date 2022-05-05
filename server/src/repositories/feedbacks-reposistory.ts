export interface feedbackCreate {
    type: string;
    comment: string;
    screenshot?: string;
}
export interface feedbacksRepository {
    create: (data: feedbackCreate) => Promise<void>;

}