import { IRepository, RepositoryDatabaseBaseType } from "../../base/interface";

export interface IStudentCourseLivesRepository extends IRepository<StudentCourseLivesRepositoryType> {};
export type StudentCourseLivesRepositoryType = RepositoryDatabaseBaseType & {
    amount: number;
    student_id: string;
    course_id: string;
    previous_mutate: Date; // last time a life was given / taken
}