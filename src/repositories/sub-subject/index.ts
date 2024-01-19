import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import { SubSubjectMockRepository } from "./mock";
import { SubSubjectMongoRepository } from "./mongo";

const SubSubjectRepository = {
    mock: new SubSubjectMockRepository(MockDatabase.getInstance().database.sub_subject),
    // mongo: new SubSubjectMongoRepository(MongoDBConnector.connection)
}

export default SubSubjectRepository;


