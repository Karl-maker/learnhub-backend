import { ISubjectRepository, SubjectRepositoryType } from "../../repositories/subject/interface";
import { AbstractBaseModel } from "../base/abstract";
import { IBaseModel } from "../base/interface";

export default class SubjectModel extends AbstractBaseModel<SubjectRepositoryType> implements IBaseModel<SubjectRepositoryType> {
    constructor(repository: ISubjectRepository) {
        super(repository);
    } 
}
