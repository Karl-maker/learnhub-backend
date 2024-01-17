import { QuizMockRepository } from "./mock";
import { QuizMongoRepository } from "./mongo";

const QuizRepository = {
    mock: QuizMockRepository,
    mongo: QuizMongoRepository
}

export default QuizRepository;


