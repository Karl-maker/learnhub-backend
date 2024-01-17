import { TopicMockRepository } from "./mock";
import { TopicMongoRepository } from "./mongo";

const TopicRepository = {
    mock: TopicMockRepository,
    mongo: TopicMongoRepository
}

export default TopicRepository;


