import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import { StudentMockRepository } from "./mock";
import { StudentMongoRepository } from "./mongo";

const StudentRepository = {
    mock: new StudentMockRepository(MockDatabase.getInstance().database.student),
    // mongo: new StudentMongoRepository(MongoDBConnector.connection)
}

export default StudentRepository;


