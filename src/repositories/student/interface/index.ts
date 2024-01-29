import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IStudentRepository extends IRepository<StudentRepositoryType> {}
export type StudentRepositoryType = RepositoryDatabaseBaseType & {
    account_id: string; // FK
    school?: {
        name?: string;
    };
    location?: {
        country: string;
        district: string;
    };
    grade?: number;
    profile?: {
        picture?: string;
        id?: string;
    };
}