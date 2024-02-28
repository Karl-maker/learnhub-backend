import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import { QuestionMockRepository } from "./mock";
import { QuestionMongoRepository } from "./mongo";

const QuestionRepository = {
    mock: new QuestionMockRepository(MockDatabase.getInstance().database.question),
    mongo: new QuestionMongoRepository()
}

export default QuestionRepository;


