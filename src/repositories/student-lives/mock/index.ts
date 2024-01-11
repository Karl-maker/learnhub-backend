import { MockDatabaseRepository } from "../../base/mock";
import { StudentCourseLivesRepositoryType, IStudentCourseLivesRepository } from "../interface";

export class StudentCourseLivesMockRepository extends MockDatabaseRepository<StudentCourseLivesRepositoryType> implements IStudentCourseLivesRepository {
    constructor(data: StudentCourseLivesRepositoryType[]) {
        super(data);
    }
}