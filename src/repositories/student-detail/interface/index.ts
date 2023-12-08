import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IStudentDetailRepository extends IRepository<StudentDetailRepositoryType> {}
export type StudentDetailRepositoryType = RepositoryDatabaseBaseType & {
    account_id: string; // FK
    school?: string;
    location?: {
        country: string;
        district: string;
    };
    current_grade?: number;
}