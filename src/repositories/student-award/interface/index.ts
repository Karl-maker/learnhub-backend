import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IStudentAwardRepository extends IRepository<StudentAwardRepositoryType> {}
export type StudentAwardRepositoryType = RepositoryDatabaseBaseType & {
    award_id: string; // FK
    student_id: string;
    tasks: {
        description: string;
    }[];
}