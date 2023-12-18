import { MockDatabaseRepository } from "./mock";
import { MongoRepository } from "./mongo";

const Repository = {
    mock: MockDatabaseRepository,
    mongo: MongoRepository
}

export default Repository;