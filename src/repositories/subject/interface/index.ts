import { IRepository, RepositoryDatabaseBaseType } from "../../base/interface";

export interface ISubjectRepository extends IRepository<SubjectRepositoryType> {};
export type SubjectRepositoryType = RepositoryDatabaseBaseType & {
    name: string;
    description: string;
}