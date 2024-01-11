import { RepositoryDatabaseBaseType } from "../../base/interface";
import { IRepository } from "../../base/interface";

export interface IAccountLoginRepository extends IRepository<AccountLoginRepositoryType> {}
export type AccountLoginRepositoryType = RepositoryDatabaseBaseType & {
    account_id: string;
    ip_address: string;
    origin: string;
    method: AccountLoginMethodsType;
    location?: AccountLoginLocationType;
    refresh: AccountLoginRefreshType;
}

export type AccountLoginLocationType = {
    country: string;
    state?: string;
    city: string;
    street: string;
}

export type AccountLoginRefreshType = {
    token: string;
    expiration: Date;
}

export type AccountLoginMethodsType = 'local' | 'facebook' | 'google';