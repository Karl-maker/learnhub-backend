import MockDatabase from "../../helpers/db/mock";
import { TopicProgressionMockRepository } from "./mock";

const TopicProgressionRepository = {
    mock: new TopicProgressionMockRepository(MockDatabase.getInstance().database.topic_progression)
}

export default TopicProgressionRepository;


