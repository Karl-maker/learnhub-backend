import { MockDatabaseRepository } from "../../base/mock";
import { IQuizRepository, QuizRepositoryType } from "../interface";

export class StudentDetailMockRepository extends MockDatabaseRepository<QuizRepositoryType> implements IQuizRepository {
    constructor(data: QuizRepositoryType[]) {
        super(data);
    }
}