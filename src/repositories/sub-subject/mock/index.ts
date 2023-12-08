import { MockDatabaseRepository } from "../../base/mock";
import { SubSubjectRepositoryType, ISubSubjectRepository } from "../interface";

export class SubSubjectMockRepository extends MockDatabaseRepository<SubSubjectRepositoryType> implements ISubSubjectRepository {
    constructor(data: SubSubjectRepositoryType[]) {
        super(data);
    }
}