import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface ISubSubjectSubscriptionRepository extends IRepository<SubSubjectSubscriptionRepositoryType> {}
export type SubSubjectSubscriptionRepositoryType = RepositoryDatabaseBaseType & {
    student_id: string; 
    sub_subject_id: string;
    status: 'active' | 'paused' | 'cancelled';
    expires_at: Date;
}