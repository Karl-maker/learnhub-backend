import { SubjectMockRepository } from "./mock";
import { SubjectMongoRepository } from "./mongo";

const SubjectRepository = {
    mock: SubjectMockRepository,
    mongo: SubjectMongoRepository
}

export default SubjectRepository;


