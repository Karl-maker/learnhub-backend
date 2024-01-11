import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface ITopicRepository extends IRepository<TopicRepositoryType> {}
export type TopicRepositoryType = RepositoryDatabaseBaseType & {
    name: string; 
    description: string;
    tier_level: number;
}