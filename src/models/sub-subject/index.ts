import { ISubSubjectRepository, SubSubjectRepositoryType } from "../../repositories/sub-subject/interface";
import { AbstractBaseModel } from "../base/abstract";
import { IBaseModel } from "../base/interface";

export default class SubSubjectModel extends AbstractBaseModel<SubSubjectRepositoryType> implements IBaseModel<SubSubjectRepositoryType> {
    constructor(repository: ISubSubjectRepository) {
        super(repository);
    } 
}
