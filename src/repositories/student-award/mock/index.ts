import { MockDatabaseRepository } from "../../base/mock";
import { IStudentAwardRepository, StudentAwardRepositoryType } from "../interface";

export class StudentAwardMockRepository extends MockDatabaseRepository<StudentAwardRepositoryType> implements IStudentAwardRepository {
    constructor(data: StudentAwardRepositoryType[]) {
        super(data);
    }
}