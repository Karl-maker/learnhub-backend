import { ITopicRepository, TopicRepositoryType } from "../../repositories/topic/interface";
import { AbstractBaseModel } from "../base/abstract";
import { IBaseModel } from "../base/interface";

export default class TopicModel extends AbstractBaseModel<TopicRepositoryType> implements IBaseModel<TopicRepositoryType> {
    constructor(repository: ITopicRepository) {
        super(repository);
    } 
}
