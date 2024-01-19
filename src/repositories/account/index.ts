import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import { AccountMockRepository } from "./mock";
import { AccountMongoRepository } from "./mongo";

const AccountRepository = {
    mock: new AccountMockRepository(MockDatabase.getInstance().database.account),
    // mongo: new AccountMongoRepository(MongoDBConnector.connection)
}

export default AccountRepository;


