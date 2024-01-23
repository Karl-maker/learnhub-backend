import { ITopicProgressionRepository, TopicProgressionRepositoryType } from "../../repositories/topic-progression/interface";
import { AbstractBaseModel } from "../base/abstract";
import { IBaseModel } from "../base/interface";

export default class TopicProgressionModel extends AbstractBaseModel<TopicProgressionRepositoryType> implements IBaseModel<TopicProgressionRepositoryType> {
    constructor(repository: ITopicProgressionRepository) {
        super(repository);
    } 
}
