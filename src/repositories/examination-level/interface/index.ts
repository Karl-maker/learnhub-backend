import { IRepository, RepositoryDatabaseBaseType } from "../../base/interface";

export interface IExaminationLevelRepository extends IRepository<ExaminationLevelRepositoryType> {};
export type ExaminationLevelRepositoryType = RepositoryDatabaseBaseType & {
    name: string;
    description: string;
    examination_board: string;
}