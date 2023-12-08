import { MockDatabaseRepository } from "../../base/mock";
import { SubjectRepositoryType, ISubjectRepository } from "../interface";

export class SubjectMockRepository extends MockDatabaseRepository<SubjectRepositoryType> implements ISubjectRepository {
    constructor(data: SubjectRepositoryType[]) {
        super(data);
    }
}