import { AccountRepositoryType, IAccountRepository } from "../../repositories/account/interface";
import { HashPasswordType, hashPassword } from "../../utils/hash";
import { AbstractBaseModel } from "../base/abstract";
import { IBaseModel, ModelUpdateByIdResult, ModelUpdateManyResult } from "../base/interface";

export default class AccountModel extends AbstractBaseModel<AccountRepositoryType> implements IBaseModel<AccountRepositoryType> {
    constructor(repository: IAccountRepository) {
        super(repository);
    }

    /**
     * @override to make password hashed
     */

    async create(data: Partial<AccountRepositoryType>): Promise<Partial<AccountRepositoryType>> {
        const hash_password: HashPasswordType = hashPassword(data.hash_password);
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
            update.hash_password = hashPassword(update.hash_password);
        }

        const result = await this.repository.update({ id }, update);
        const updated_result = await this.repository.find({ id });
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
            update.hash_password = hashPassword(update.hash_password);
        }
    
        const result = await this.repository.update(where, update);
        return {
            mutated: result.mutated
        };
    }
    
}
