import { MockDatabaseRepository } from "../../base/mock";
import { IQuestionCommentLikeRepository, QuestionCommentLikeRepositoryType } from "../interface";

export class QuestionCommentLikeMockRepository extends MockDatabaseRepository<QuestionCommentLikeRepositoryType> implements IQuestionCommentLikeRepository {
    constructor(data: QuestionCommentLikeRepositoryType[]) {
        super(data);
    }
}