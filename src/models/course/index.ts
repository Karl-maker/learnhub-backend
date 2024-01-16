import { CourseRepositoryType, ICourseRepository } from "../../repositories/course/interface";
import { AbstractBaseModel } from "../base/abstract";
import { IBaseModel } from "../base/interface";

export default class CourseModel extends AbstractBaseModel<CourseRepositoryType> implements IBaseModel<CourseRepositoryType> {
    constructor(repository: ICourseRepository) {
        super(repository);
    } 
}
