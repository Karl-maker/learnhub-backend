import { AccountRepositoryType } from "../../../repositories/account/interface";

export default interface ISignupService<T> {
    signup(credential: T): Promise<Partial<AccountRepositoryType>>;
}

