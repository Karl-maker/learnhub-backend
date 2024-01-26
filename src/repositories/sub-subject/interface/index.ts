import { IRepository, RepositoryDatabaseBaseType } from "../../base/interface";

export interface ISubSubjectRepository extends IRepository<SubSubjectRepositoryType> {};
export type SubSubjectRepositoryType = RepositoryDatabaseBaseType & {
    name: string;
    description: string;
    examination_level_id?: string[];
    course_id: string[];
    subject_name: string;
}