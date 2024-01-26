import { AccountRepositoryType, IAccountRepository } from "../../repositories/account/interface";
import { hashPassword } from "../../utils/hash";
import { AbstractBaseModel } from "../base/abstract";
import { IBaseModel, ModelDeleteByIdResult, ModelDeleteManyResult, ModelDeleteOneResult, ModelUpdateByIdResult, ModelUpdateManyResult } from "../base/interface";

export default class AccountModel extends AbstractBaseModel<AccountRepositoryType> implements IBaseModel<AccountRepositoryType> {
    constructor(repository: IAccountRepository) {
        super(repository);
    }

    /**
     * @override to make password hashed
     */

    async create(data: Partial<AccountRepositoryType>): Promise<AccountRepositoryType> {
        const hash_password = await hashPassword(data.hash_password);
        const result = await this.repository.create({
            ...data,
            hash_password
        });
        return result;
    }

    /**
     * @override to make password hashed
     */

    async updateById(id: string, update: Partial<AccountRepositoryType>): Promise<ModelUpdateByIdResult<AccountRepositoryType>> {
        if(update.hash_password) {
            update.hash_password = await hashPassword(update.hash_password);
        }

        const result = await this.repository.update({ id }, update);
        const updated_result = await this.repository.find({ id }, {
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
            status: result.mutated <= 1,
            data: updated_result.data[0]
        };
    }

    /**
     * @override to make password hashed
     */

    async updateMany(where: Partial<AccountRepositoryType>, update: Partial<AccountRepositoryType>): Promise<ModelUpdateManyResult> {
        if(update.hash_password) {
            update.hash_password = await hashPassword(update.hash_password);
        }
    
        const result = await this.repository.update(where, update);
        return {
            mutated: result.mutated
        };
    }

    /**
     * @override delete with soft deletion
     */

    async deleteById(id: string): Promise<ModelDeleteByIdResult<AccountRepositoryType>> {
        const where = {
            id
        };

        const update = {
            deleted: true
        };
    
        const result = await this.repository.update(where, update);
        const account = await this.repository.find(where, {
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
            successful: result.mutated >= 1,
            data: account.data[0]
        };
    }

    /**
     * @override delete with soft deletion
     */

    async deleteOne(where: Partial<AccountRepositoryType>): Promise<ModelDeleteOneResult<AccountRepositoryType>> {

        const update = {
            deleted: true
        };
    
        const account = await this.repository.find(where);
        const result = await this.repository.update({ id: account.data[0].id }, update);
        const updated_account = await this.repository.find({ id: account.data[0].id }, {
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
            successful: result.mutated >= 1,
            data: updated_account.data[0]
        };
    }

    /**
     * @override delete with soft deletion
     */

    async deleteMany(where: Partial<AccountRepositoryType>): Promise<ModelDeleteManyResult> {
        const update = {
            deleted: true
        };
    
        const result = await this.repository.update(where, update);
        return {
            deleted: result.mutated
        };
    }
    
}
