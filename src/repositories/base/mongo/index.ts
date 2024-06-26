import mongoose, { Document, FilterQuery, Model } from 'mongoose';
import { IRepository, RepositoryDatabaseBaseType, RepositoryDeleteResult, RepositoryFindOptions, RepositoryFindResult, RepositoryUpdateResult } from '../interface';
import logger from '../../../helpers/logger';

export abstract class MongoRepository<T> implements IRepository<T> {
  private readonly model: Model<Document & T>;

  constructor(model: Model<Document & T>) {
    this.model = model;
  }

  async find(where: T, options?: RepositoryFindOptions<T>): Promise<RepositoryFindResult<T>> {
    logger.debug(`Repository.find(): `, { where });
    const query = this.model.find(where as FilterQuery<any>);

    // Apply sorting if specified
    if (options?.sort) {
      const { direction, field } = options.sort;
      query.sort({ [field as string]: direction === 'asc' ? 1 : -1 });
    }

    // Apply pagination if specified
    if (options?.pagination) {
      const { page, size } = options.pagination;
      query.skip((page - 1) * size).limit(size);
    }

    const data = await query.exec();
    const amount = await this.model.countDocuments(where as FilterQuery<any>);
    logger.debug(`Repository.find().result: `, { data });
    return { data, amount };
  }

  async create(data: T): Promise<T> {
    const createdData = await this.model.create(data);
    const updatedData = await this.model.findByIdAndUpdate(createdData._id, { id: createdData._id }, { new: true })
    return updatedData.toObject() as T;
  }


  async update(where: T, data: T): Promise<RepositoryUpdateResult> {
    logger.debug(`Repository.update(): `, { where, data });
    const result = await this.model.findOneAndUpdate(
      where,
      data,
      { new: true } // Setting `new` to true returns the modified document instead of the original one
    );
  
    // Check if the document was modified
    const mutated = result !== null ? 1 : 0;

    logger.debug(`Repository.update().results: `, mutated);
  
    return { mutated };
  }

  async delete(where: T): Promise<RepositoryDeleteResult> {
    const result = await this.model.deleteMany(where as FilterQuery<any>);
    return { deleted: result.deletedCount || 0 };
  }
}
