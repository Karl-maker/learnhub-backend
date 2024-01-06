import { AccountRepositoryType } from "../../repositories/account/interface";
import AbstractBaseController from "../base/abstract";
import IBaseController from "../base/interface";

export default class AccountController extends AbstractBaseController<AccountRepositoryType> implements IBaseController<AccountRepositoryType> {
    constructor() {
        super('account_id');
    }
}