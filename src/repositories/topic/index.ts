import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import { TopicMockRepository } from "./mock";
import { TopicMongoRepository } from "./mongo";

const TopicRepository = {
    mock: new TopicMockRepository(MockDatabase.getInstance().database.topic),
    // mongo: new TopicMongoRepository(MongoDBConnector.connection)
}

export default TopicRepository;


