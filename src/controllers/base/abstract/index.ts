import { RequestHandler, Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { FindManyOptions, IBaseModel } from "../../../models/base/interface";
import IBaseController from "../interface";

export default abstract class AbstractBaseController<T> implements IBaseController<T> {
    private id: string;
    constructor(id: string) {
        this.id = id;
    }
    findById(model: IBaseModel<T>): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const data = await model.findById(req.params[this.id]);
                res.json({
                    data
                });
            } catch(err) {
                next(err);
            }
        }
    }
    findAll(model: IBaseModel<T>): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {

                const findManyOptions: FindManyOptions<T> = {
                    sort: {
                      field: req.query.field as keyof T, 
                      direction: req.query.sort as 'asc' | 'desc', // Assuming 'sort' is either 'asc' or 'desc'
                    },
                    page: {
                      size: parseInt(req.query.page_size as string, 10) || 10, // Assuming 'page_size' is a number or default to 10
                      number: parseInt(req.query.page as string, 10) || 1, // Assuming 'page_number' is a number or default to 1
                    },
                };

                delete req.query.sort;
                delete req.query.field;
                delete req.query.page_size;
                delete req.query.page;

                const findManyWhere: Partial<T> = req.query as Partial<T>;
                const result = await model.findMany(findManyWhere, findManyOptions);
                res.json(result);
            } catch(err) {
                next(err);
            }
        }
    }
    create(model: IBaseModel<T>): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const data = await model.create(req.body);
                res.json({
                    data
                });
            } catch(err) {
                next(err);
            }
        }
    }
    updateById(model: IBaseModel<T>): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const data = await model.updateById(req.params[this.id], req.body);
                res.json({
                    data
                });
            } catch(err) {
                next(err);
            }
        }
    }
    updateMany(model: IBaseModel<T>): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // Initialize the response array
                let response: { id: string, result: boolean }[] = [];
                const listOfIds: string[] = req.body.list;
                const update: Partial<T> = req.body.update as Partial<T>; // Cast update to Partial<T>
    
                // Use Promise.all to wait for all updateById calls to complete
                await Promise.all(listOfIds.map(async (id: string) => {
                    const result = await model.updateById(id, {
                        ...update
                    });
    
                    response.push({
                        id,
                        result: result.status
                    });
                }));
    
                res.json({
                    data: response
                });
            } catch (err) {
                next(err);
            }
        }
    } 
    deleteById(model: IBaseModel<T>): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async(req: Request, res: Response, next: NextFunction) => {
            try {
                const data = await model.deleteById(req.params[this.id]);
                res.json({
                    data
                });
            } catch(err) {
                next(err);
            }
        }
    }
    deleteMany(model: IBaseModel<T>): RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // Initialize the response array
                let response: { id: string, result: boolean }[] = [];
                const listOfIds: string[] = req.body.list;
    
                // Use Promise.all to wait for all updateById calls to complete
                await Promise.all(listOfIds.map(async (id: string) => {
                    const result = await model.deleteById(id);
    
                    response.push({
                        id,
                        result: result.successful
                    });
                }));
    
                res.json({
                    data: response
                });
            } catch (err) {
                next(err);
            }
        }
    }

}
