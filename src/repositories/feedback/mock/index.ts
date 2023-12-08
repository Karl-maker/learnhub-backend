import { MockDatabaseRepository } from "../../base/mock";
import { IFeedbackRepository, FeedbackRepositoryType } from "../interface";

export class FeedbackMockRepository extends MockDatabaseRepository<FeedbackRepositoryType> implements IFeedbackRepository {
    constructor(data: FeedbackRepositoryType[]) {
        super(data);
    }
}