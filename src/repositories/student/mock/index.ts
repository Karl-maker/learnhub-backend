import { MockDatabaseRepository } from "../../base/mock";
import { IStudentRepository, StudentRepositoryType } from "../interface";

export class StudentMockRepository extends MockDatabaseRepository<StudentRepositoryType> implements IStudentRepository {
    constructor(data: StudentRepositoryType[]) {
        super(data);
    }
}