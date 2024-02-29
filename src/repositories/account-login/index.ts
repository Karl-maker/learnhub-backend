import MockDatabase from "../../helpers/db/mock";
import { AccountLoginMockRepository } from "./mock";
import { AccountLoginMongoRepository } from "./mongo";

const AccountLoginRepository = {
    mock: new AccountLoginMockRepository(MockDatabase.getInstance().database.account_login),
    mongo: new AccountLoginMongoRepository()
}

export default AccountLoginRepository;


