import { SubSubjectRepositoryType } from "../../repositories/sub-subject/interface";
import AbstractBaseController from "../base/abstract";
import IBaseController from "../base/interface";

export default class SubSubjectController extends AbstractBaseController<SubSubjectRepositoryType> implements IBaseController<SubSubjectRepositoryType> {
    constructor() {
        super('sub_subject_id');
    }
}