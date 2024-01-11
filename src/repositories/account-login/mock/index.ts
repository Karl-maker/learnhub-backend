import { AccountLoginRepositoryType, IAccountLoginRepository } from "../interface";
import BaseRepository from "../../base";

export class AccountLoginMockRepository extends BaseRepository.mock<AccountLoginRepositoryType> implements IAccountLoginRepository {
    constructor(data: AccountLoginRepositoryType[]) {
        super(data);
    }
}
