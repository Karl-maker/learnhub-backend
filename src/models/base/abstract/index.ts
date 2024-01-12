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

    create(data: Partial<T>): Promise<Partial<T>> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<Partial<T>> {
        try {
            const where: Partial<T> = { id } as unknown as Partial<T>;
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
    async findOne(where: Partial<T>): Promise<Partial<T>> {
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
    updateById(id: string, update: Partial<T>): Promise<ModelUpdateByIdResult<T>> {
        throw new Error("Method not implemented.");
    }
    updateOne(where: Partial<T>, update: Partial<T>): Promise<Partial<T>> {
        throw new Error("Method not implemented.");
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
