import { MockDatabaseRepository } from "../../base/mock";
import { ITopicProgressionRepository, TopicProgressionRepositoryType } from "../interface";

export class TopicProgressionMockRepository extends MockDatabaseRepository<TopicProgressionRepositoryType> implements ITopicProgressionRepository {
    constructor(data: TopicProgressionRepositoryType[]) {
        super(data);
    }
}