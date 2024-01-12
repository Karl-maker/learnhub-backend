import { AccountLoginMockRepository } from "./mock";
import { AccountLoginMongoRepository } from "./mongo";

const AccountLoginRepository = {
    mock: AccountLoginMockRepository,
    mongo: AccountLoginMongoRepository
}

export default AccountLoginRepository;


