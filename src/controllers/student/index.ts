import { NextFunction, RequestHandler, Request, Response } from "express";
import { studentEvent, StudentEventCreatePayload, StudentEventUpdateProfilePicturePayload } from "../../events/definitions/student";
import { StudentRepositoryType } from "../../repositories/student/interface";
import AbstractBaseController from "../base/abstract";
import IBaseController from "../base/interface";
import event from "../../helpers/event";
import { AuthAccountPayload } from "../../middlewares/authenticate/interface";
import StudentModel from "../../models/student";
import IUpload, { UploadCallback } from "../../service/upload/interface";
import NotFoundError from "../../utils/error/not-found";
import InternalServerError from "../../utils/error/internal-server";
import logger from "../../helpers/logger";

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
                uploadService.upload(data, (data: UploadCallback) => {
                    (async () => {                        
                        const student = await studentService.findOne({ account_id: account.id });
                        let old_data: { url: string; id: string; ext: string; };

                        const doesStudentHaveProfileImage: boolean = student.profile?.picture ? true : false;

                        if(doesStudentHaveProfileImage) {
                            old_data = {
                                url: student.profile.picture.url,
                                id: student.profile.picture.id,
                                ext: student.profile.picture.ext
                            }
                        }

                        if(!student) {
                            throw new InternalServerError('No student found');
                        }

                        await studentService.updateOne({
                            account_id: account.id 
                        }, {
                            profile: {
                                picture: {
                                    url: data.location,
                                    id: data.key,
                                    ext: data.ext
                                }
                            }
                        });

                        if(doesStudentHaveProfileImage) {
                            const payload: StudentEventUpdateProfilePicturePayload = {
                                student: {
                                    id: student.id
                                },
                                picture: {
                                    new: {
                                        url: student.profile.picture.url,
                                        id: student.profile.picture.id,
                                        ext: student.profile.picture.ext
                                    },
                                    old: {
                                        url: old_data.url,
                                        id: old_data.id,
                                        ext: old_data.ext
                                    }
                                }
                            }
                            event.publish(studentEvent.topics.StudentProfileImageUpdate, payload)
                        }

                    })();
                }, (err: Error) => {
                    logger.error(`Issue occured uploading student image`, err);
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