import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IStudentRepository extends IRepository<StudentRepositoryType> {}
export type StudentRepositoryType = RepositoryDatabaseBaseType & {
    account_id: string; // FK
    school?: string;
    location?: {
        country: string;
        district: string;
    };
    current_grade?: number;
}