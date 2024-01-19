import MockDatabase from "../../helpers/db/mock";
import MongoDBConnector from "../../helpers/db/mongo";
import { AccountLoginMockRepository } from "./mock";
import { AccountLoginMongoRepository } from "./mongo";

const AccountLoginRepository = {
    mock: new AccountLoginMockRepository(MockDatabase.getInstance().database.account_login),
    // mongo: new AccountLoginMongoRepository(MongoDBConnector.connection)
}

export default AccountLoginRepository;


