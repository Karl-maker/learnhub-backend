import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface ISubSubjectSubscriptionRepository extends IRepository<SubSubjectSubscriptionRepositoryType> {}
export type SubSubjectSubscriptionRepositoryType = RepositoryDatabaseBaseType & {
    student_id: string; 
    sub_subject_id: string;
    status: 'active' | 'paused' | 'cancelled';
    paid_for_by: 'free' | 'paid';
    payment_method: 'stripe' | 'wipay';
    metadata: Record<string, string>;
    cancelled_at?: Date;
    expires_at: Date;
}