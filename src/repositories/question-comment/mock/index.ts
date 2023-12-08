import { MockDatabaseRepository } from "../../base/mock";
import { IQuestionCommentRepository, QuestionCommentRepositoryType } from "../interface";

export class QuestionCommentMockRepository extends MockDatabaseRepository<QuestionCommentRepositoryType> implements IQuestionCommentRepository {
    constructor(data: QuestionCommentRepositoryType[]) {
        super(data);
    }
}