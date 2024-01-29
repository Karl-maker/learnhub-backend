import path from "path";
import { BlobRepositoryType, IBlobRepository } from "../../repositories/blob/interface";
import { AbstractBaseModel } from "../base/abstract";
import { IBaseModel, ModelDeleteByIdResult } from "../base/interface";

export default class ContentModel extends AbstractBaseModel<BlobRepositoryType> implements IBaseModel<BlobRepositoryType> {
    constructor(repository: IBlobRepository) {
        super(repository);
    } 

    async findById(id: string): Promise<BlobRepositoryType> {
        try {
            const fileExtension = path.extname(id);
            const fileId = path.basename(id, fileExtension);

            const result = await this.repository.find({
                id: fileId
            })
            return result.data[0];
        } catch(err) {
            throw err;
        }   
    }

    async deleteById(id: string): Promise<ModelDeleteByIdResult<BlobRepositoryType>> {
        try {
            const fileExtension = path.extname(id);
            const fileId = path.basename(id, fileExtension);

            const content = await this.repository.find({
                id: fileId
            });

            const result = await this.repository.delete({
                id: fileId,
                ext: fileExtension
            });

            return {
                successful: result.deleted > 0,
                data: content.data[0]
            }
        } catch(err) {
            throw err;
        }   
    }
}
