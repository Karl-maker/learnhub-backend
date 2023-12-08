import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface ITopicProgressionRepository extends IRepository<TopicProgressionRepositoryType> {}
export type TopicProgressionRepositoryType = RepositoryDatabaseBaseType & {
    student_id: string; 
    topic_id: string;
    status: 'incomplete' | 'complete' | 'exempted';
    progress: number; // %
}