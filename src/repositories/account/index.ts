import { Connection } from "mongoose";
import MockDatabase from "../../helpers/db/mock";
import { AccountMockRepository } from "./mock";
import { AccountMongoRepository } from "./mongo";

const AccountRepository = {
    mock: new AccountMockRepository(MockDatabase.getInstance().database.account),
    mongo: new AccountMongoRepository()
}

export default AccountRepository;


