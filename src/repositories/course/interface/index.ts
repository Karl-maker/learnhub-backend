import { IRepository, RepositoryDatabaseBaseType } from "../../base/interface";

export interface ICourseRepository extends IRepository<CourseRepositoryType> {};
export type CourseRepositoryType = RepositoryDatabaseBaseType & {
    name: string;
    description: string;
    grades: number[];
    topics: string[];
}