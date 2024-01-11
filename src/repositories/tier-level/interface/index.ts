import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface ITierLevelRepository extends IRepository<TierLevelRepositoryType> {}
export type TierLevelRepositoryType = RepositoryDatabaseBaseType & {
    name: string; 
    description: string;
    level: number;
}