import { QuestionMockRepository } from "./mock";
import { QuestionMongoRepository } from "./mongo";

const QuestionRepository = {
    mock: QuestionMockRepository,
    mongo: QuestionMongoRepository
}

export default QuestionRepository;


