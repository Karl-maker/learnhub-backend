import { IRepository, RepositoryDatabaseBaseType } from "../../base/interface";

export interface IAwardRepository extends IRepository<AwardRepositoryType> {};
export type AwardRepositoryType = RepositoryDatabaseBaseType & {
    icon_url?: string;
    name: string;
    description: string;
    tasks: {
        description: string;
    }[];
}