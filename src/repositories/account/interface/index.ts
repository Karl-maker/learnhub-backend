import { HashPasswordType } from "../../../utils/hash";
import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IAccountRepository extends IRepository<AccountRepositoryType> {}
export type AccountRepositoryType = RepositoryDatabaseBaseType & {
    first_name: string;
    last_name: string;
    email?: string;
    mobile?: string;
    hash_password?: HashPasswordType;
    type: 'student' | 'administrator';
    deleted?: boolean;
    deactivated?: boolean;
}