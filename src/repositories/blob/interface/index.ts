import { IRepository, RepositoryDatabaseBaseType } from "../../base/interface";

export interface IBlobRepository extends IRepository<BlobRepositoryType> {}

export type BlobRepositoryType = RepositoryDatabaseBaseType & {
    location?: string;
    path?: string;
    buffer?: Buffer | null;
    ext: string;
    file_name: string;
}

