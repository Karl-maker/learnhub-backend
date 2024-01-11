import { MockDatabaseRepository } from "../../base/mock";
import { ITopicRepository, TopicRepositoryType } from "../interface";

export class TopicMockRepository extends MockDatabaseRepository<TopicRepositoryType> implements ITopicRepository {
    constructor(data: TopicRepositoryType[]) {
        super(data);
    }
}