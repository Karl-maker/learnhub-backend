import { AccountLoginRepositoryType, IAccountLoginRepository } from "../../repositories/account-login/interface";
import { AbstractBaseModel } from "../base/abstract";
import { IBaseModel } from "../base/interface";

export default class AccountLoginModel extends AbstractBaseModel<AccountLoginRepositoryType> implements IBaseModel<AccountLoginRepositoryType> {
    constructor(repository: IAccountLoginRepository) {
        super(repository);
    } 
}
