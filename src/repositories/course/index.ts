import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import { CourseMockRepository } from "./mock";
import { CourseMongoRepository } from "./mongo";

const CourseRepository = {
    mock: new CourseMockRepository(MockDatabase.getInstance().database.course),
    // mongo: new CourseMongoRepository(MongoDBConnector.connection)
}

export default CourseRepository;


