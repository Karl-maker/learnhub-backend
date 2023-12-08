import { MockDatabaseRepository } from "../../base/mock";
import { CourseRepositoryType, ICourseRepository } from "../interface";

export class CourseMockRepository extends MockDatabaseRepository<CourseRepositoryType> implements ICourseRepository {
    constructor(data: CourseRepositoryType[]) {
        super(data);
    }
}