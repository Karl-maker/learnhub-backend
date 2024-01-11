import { MockDatabaseRepository } from "../../base/mock";
import { ExaminationLevelRepositoryType, IExaminationLevelRepository } from "../interface";

export class ExaminationMockRepository extends MockDatabaseRepository<ExaminationLevelRepositoryType> implements IExaminationLevelRepository {
    constructor(data: ExaminationLevelRepositoryType[]) {
        super(data);
    }
}