import { IRepository, RepositoryDatabaseBaseType } from "../../base/interface";

export interface IAudit extends IRepository<AuditRepositoryType> {};
export type AuditRepositoryType = RepositoryDatabaseBaseType & {
    account_id: string;
    action: string;
}