import { SubjectRepositoryType } from "../../repositories/subject/interface";
import AbstractBaseController from "../base/abstract";
import IBaseController from "../base/interface";

export default class SubjectController extends AbstractBaseController<SubjectRepositoryType> implements IBaseController<SubjectRepositoryType> {
    constructor() {
        super('subject_id');
    }
}