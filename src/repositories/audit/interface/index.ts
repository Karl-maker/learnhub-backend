import { IRepository, RepositoryDatabaseBaseType } from "../../base/interface";

export interface IAuditRepository extends IRepository<AuditRepositoryType> {};
export type AuditRepositoryType = RepositoryDatabaseBaseType & {
    account_id: string;
    action: string;
}