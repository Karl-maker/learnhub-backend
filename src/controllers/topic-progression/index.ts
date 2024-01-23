import { TopicProgressionRepositoryType } from "../../repositories/topic-progression/interface";
import AbstractBaseController from "../base/abstract";
import IBaseController from "../base/interface";

export default class TopicProgressionController extends AbstractBaseController<TopicProgressionRepositoryType> implements IBaseController<TopicProgressionRepositoryType> {
    constructor() {
        super('topic_progression_id');
    }
}