import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import { QuizMockRepository } from "./mock";
import { QuizMongoRepository } from "./mongo";

const QuizRepository = {
    mock: new QuizMockRepository(MockDatabase.getInstance().database.quiz),
    mongo: new QuizMongoRepository()
}

export default QuizRepository;


