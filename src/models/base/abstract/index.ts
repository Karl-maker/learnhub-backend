import logger from "../../../helpers/logger";
import { IRepository } from "../../../repositories/base/interface";
import { FindManyOptions, IBaseModel, ModelDeleteByIdResult, ModelDeleteManyResult, ModelDeleteOneResult, ModelFindManyResult, ModelUpdateByIdResult, ModelUpdateManyResult } from "../interface";

/**
 * @todo complete code
 */

export abstract class AbstractBaseModel<T> implements IBaseModel<T> {
    repository: IRepository<T>;

    constructor(repository: IRepository<T>) {
        this.repository = repository;
    }

    async create(data: Partial<T>): Promise<T> {
        try {
            const result = await this.repository.create(data as T);
            return {
                ...result
            }
        } catch(err) {
            throw err;
        }
    }
    async findById(id: string): Promise<T> {
        try {
            const where: T = { id } as unknown as T;
            const result = await this.repository.find(where, {
                sort: {
                    direction: 'asc',
                    field: 'created_at'
                },
                pagination: {
                    size: 1,
                    page: 1
                }
            });
            return result.data[0];
        } catch(err) {
            throw err;
        }
    }
    async findOne(where: Partial<T>): Promise<T> {
        try {
            const result = await this.repository.find(where, {
                sort: {
                    direction: 'asc',
                    field: 'created_at'
                },
                pagination: {
                    size: 1,
                    page: 1
                }
            });

            return result.data[0];
        } catch(err) {
            throw err
        }
    }
    async findMany(where: Partial<T>, options: FindManyOptions<T>): Promise<ModelFindManyResult<T>> {
        try {
            const result = await this.repository.find(where, {
                sort: {
                    direction: options.sort.direction,
                    field: options.sort.field
                },
                pagination: {
                    size: options.page.size,
                    page: options.page.number
                }
            });

            return {
                data: result.data,
                amount: result.amount
            }
        } catch(err) {
            throw err
        }
    }
    async updateById(id: string, update: Partial<T>): Promise<ModelUpdateByIdResult<T>> {
        try {
            const where: T = { id } as unknown as T;
            logger.debug(`Model.updateById():`, {
                where,
                update
            })
            const result = await this.repository.update(where, update);
            const data = await this.repository.find(where, {
                sort: {
                    direction: 'asc',
                    field: 'created_at'
                },
                pagination: {
                    size: 1,
                    page: 1
                }
            });
            return {
                status: result.mutated > 0,
                data: data.data[0]
            }
        } catch(err) {
            throw err;
        }
    }
    async updateOne(where: Partial<T>, update: Partial<T>): Promise<T> {
        try {
            logger.debug(`Model.updateById():`, {
                where,
                update
            })
            await this.repository.update(where, update);
            const data = await this.repository.find(where, {
                sort: {
                    direction: 'asc',
                    field: 'created_at'
                },
                pagination: {
                    size: 1,
                    page: 1
                }
            });
            return {
                ...data.data[0]
            }
        } catch(err) {
            throw err;
        }
    }
    updateMany(where: Partial<T>, update: Partial<T>): Promise<ModelUpdateManyResult> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<ModelDeleteByIdResult<T>> {
        throw new Error("Method not implemented.");
    }
    deleteOne(where: Partial<T>): Promise<ModelDeleteOneResult<T>> {
        throw new Error("Method not implemented.");
    }
    deleteMany(where: Partial<T>): Promise<ModelDeleteManyResult> {
        throw new Error("Method not implemented.");
    }

}
