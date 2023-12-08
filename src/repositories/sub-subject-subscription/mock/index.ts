import { MockDatabaseRepository } from "../../base/mock";
import { ISubSubjectSubscriptionRepository, SubSubjectSubscriptionRepositoryType } from "../interface";

export class SubSubjectSubscriptionMockRepository extends MockDatabaseRepository<SubSubjectSubscriptionRepositoryType> implements ISubSubjectSubscriptionRepository {
    constructor(data: SubSubjectSubscriptionRepositoryType[]) {
        super(data);
    }
}