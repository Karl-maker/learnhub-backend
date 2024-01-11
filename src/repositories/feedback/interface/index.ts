import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IFeedbackRepository extends IRepository<FeedbackRepositoryType> {}
export type FeedbackRepositoryType = RepositoryDatabaseBaseType & {
    description: string; 
    rating?: number;
    by: string; // account_id

    quiz_id?: string;
    student_id?: string;
}
