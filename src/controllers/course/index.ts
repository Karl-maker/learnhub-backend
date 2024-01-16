import { CourseRepositoryType } from "../../repositories/course/interface";
import AbstractBaseController from "../base/abstract";
import IBaseController from "../base/interface";

export default class CourseController extends AbstractBaseController<CourseRepositoryType> implements IBaseController<CourseRepositoryType> {
    constructor() {
        super('course_id');
    }
}