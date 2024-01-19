import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import { SubjectMockRepository } from "./mock";
import { SubjectMongoRepository } from "./mongo";

const SubjectRepository = {
    mock: new SubjectMockRepository(MockDatabase.getInstance().database.subject),
    // mongo: new SubjectMongoRepository(MongoDBConnector.connection)
}

export default SubjectRepository;


