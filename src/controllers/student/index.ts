import { NextFunction, RequestHandler, Request, Response } from "express";
import { studentEvent, StudentEventCreatePayload } from "../../events/definitions/student";
import { StudentRepositoryType } from "../../repositories/student/interface";
import AbstractBaseController from "../base/abstract";
import IBaseController from "../base/interface";
import event from "../../helpers/event";
import { AuthAccountPayload } from "../../middlewares/authenticate/interface";
import StudentModel from "../../models/student";
import IUpload from "../../service/upload/interface";

export default class StudentController extends AbstractBaseController<StudentRepositoryType> implements IBaseController<StudentRepositoryType> {
    constructor() {
        super('student_id');
    }

    createCurrent(studentService: StudentModel): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const data = req.body as StudentRepositoryType;
                const account: AuthAccountPayload | null = req['account'];

                const result = await studentService.create({
                    ...data,
                    account_id: account.id 
                });

                const payload: StudentEventCreatePayload = {
                    student: result
                }

                event.publish(studentEvent.topics.StudentCreate, payload);
                
                res.json({
                    data: result
                })

            } catch(err) {
                next(err);
            }
        }
    }

    getCurrent(studentService: StudentModel): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const account: AuthAccountPayload | null = req['account'];

                const result = await studentService.findOne({
                    account_id: account.id
                });

                res.json({
                    data: result
                })

            } catch(err) {
                next(err);
            }
        }
    }

    updateCurrent(studentService: StudentModel): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const data = req.body as StudentRepositoryType;
                const account: AuthAccountPayload | null = req['account'];

                const result = await studentService.updateOne({
                    account_id: account.id 
                }, {
                    ...data
                });

                res.json({
                    data: result,
                    updated: true
                })

            } catch(err) {
                next(err);
            }
        }
    }

    uploadProfilePicture(studentService: StudentModel, uploadService: IUpload): RequestHandler {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const account: AuthAccountPayload | null = req['account'];
                const data: Express.Multer.File = req.file;
                uploadService.upload(data, (location: string) => {
                    (async () => {
                        const student = await studentService.findById(account.id);
                        await studentService.updateOne({
                            account_id: account.id 
                        }, {
                            profile: {
                                ...student.profile,
                                picture: location
                            }
                        });
                    })();
                })

                res.json({
                    updated: true
                })

            } catch(err) {
                next(err);
            }
        }
    }

}