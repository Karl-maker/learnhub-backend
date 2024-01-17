import { CourseMockRepository } from "./mock";
import { CourseMongoRepository } from "./mongo";

const CourseRepository = {
    mock: CourseMockRepository,
    mongo: CourseMongoRepository
}

export default CourseRepository;


