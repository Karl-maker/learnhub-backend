import { MockDatabaseRepository } from "../../base/mock";
import { IStudentDetailRepository, StudentDetailRepositoryType } from "../interface";

export class StudentDetailMockRepository extends MockDatabaseRepository<StudentDetailRepositoryType> implements IStudentDetailRepository {
    constructor(data: StudentDetailRepositoryType[]) {
        super(data);
    }
}