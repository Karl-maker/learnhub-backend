import { IStudentRepository, StudentRepositoryType } from "../../repositories/student/interface";
import { AbstractBaseModel } from "../base/abstract";
import { IBaseModel } from "../base/interface";

export default class StudentModel extends AbstractBaseModel<StudentRepositoryType> implements IBaseModel<StudentRepositoryType> {
    constructor(repository: IStudentRepository) {
        super(repository);
    } 
}
