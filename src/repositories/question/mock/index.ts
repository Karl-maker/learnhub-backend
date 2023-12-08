import { MockDatabaseRepository } from "../../base/mock";
import { IQuestionRepository, QuestionRepositoryType } from "../interface";

export class QuestionMockRepository extends MockDatabaseRepository<QuestionRepositoryType> implements IQuestionRepository {
    constructor(data: QuestionRepositoryType[]) {
        super(data);
    }
}