import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IStudentRepository extends IRepository<StudentRepositoryType> {}
export type StudentRepositoryType = RepositoryDatabaseBaseType & {
    account_id: string; // FK
    username?: string;
    display_name?: string;
    school?: {
        name?: string;
    };
    location?: {
        country: string;
        district: string;
    };
    grade?: number;
    profile?: {
        picture?: {
            id: string;
            ext: string;
            url: string;
        }
    };
}