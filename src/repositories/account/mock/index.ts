import { AccountRepositoryType } from "../interface";
import BaseRepository from "../../base";
import { IAccountRepository } from "../interface";

export class AccountMockRepository extends BaseRepository.mock<AccountRepositoryType> implements IAccountRepository {
    constructor(data: AccountRepositoryType[]) {
        super(data);
    }
}
