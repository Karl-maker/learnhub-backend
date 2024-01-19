import { StudentMockRepository } from "./mock";
import { StudentMongoRepository } from "./mongo";

const StudentRepository = {
    mock: StudentMockRepository,
    mongo: StudentMongoRepository
}

export default StudentRepository;


