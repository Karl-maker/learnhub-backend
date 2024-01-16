import { TopicRepositoryType } from "../../repositories/topic/interface";
import AbstractBaseController from "../base/abstract";
import IBaseController from "../base/interface";

export default class TopicController extends AbstractBaseController<TopicRepositoryType> implements IBaseController<TopicRepositoryType> {
    constructor() {
        super('topic_id');
    }
}