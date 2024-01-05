import { AccountRepositoryType, IAccountRepository } from "../../repositories/account/interface";
import { AbstractBaseModel } from "../base/abstract";
import { IBaseModel } from "../base/interface";

export default class AccountModel extends AbstractBaseModel<AccountRepositoryType> implements IBaseModel<AccountRepositoryType> {
    constructor(repository: IAccountRepository) {
        super(repository);
    }
}
