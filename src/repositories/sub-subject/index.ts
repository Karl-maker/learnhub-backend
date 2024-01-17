import { SubSubjectMockRepository } from "./mock";
import { SubSubjectMongoRepository } from "./mongo";

const SubSubjectRepository = {
    mock: SubSubjectMockRepository,
    mongo: SubSubjectMongoRepository
}

export default SubSubjectRepository;


