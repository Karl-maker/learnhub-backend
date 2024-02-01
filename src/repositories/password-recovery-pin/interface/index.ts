import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IPasswordRecoveryPinRepository extends IRepository<PasswordRecoveryPinRepositoryType> {}
export type PasswordRecoveryPinRepositoryType = RepositoryDatabaseBaseType & {
    account_id: string;
    code: string;
    expires_at: Date;
    confirmed: boolean;
}
