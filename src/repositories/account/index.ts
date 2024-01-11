import { AccountMockRepository } from "./mock";
import { AccountMongoRepository } from "./mongo";

const AccountRepository = {
    mock: AccountMockRepository,
    mongo: AccountMongoRepository
}

export default AccountRepository;


