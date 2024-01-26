import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { IBlobRepository, BlobRepositoryType } from '../interface';
import { RepositoryFindOptions, RepositoryFindResult, RepositoryUpdateResult, RepositoryDeleteResult } from '../../base/interface';
import path from 'path';

class S3BlobRepository implements IBlobRepository {
  private s3: S3;
  private bucketName: string;

  constructor(s3: S3, bucketName: string) {
    this.s3 = s3;
    this.bucketName = bucketName;
  }

  async find(where: BlobRepositoryType, options?: RepositoryFindOptions<BlobRepositoryType>): Promise<RepositoryFindResult<BlobRepositoryType>> {
    const listObjectsParams: S3.Types.ListObjectsRequest = {
      Bucket: this.bucketName,
    };

    const s3Objects = await this.s3.listObjectsV2(listObjectsParams).promise();

    const filteredObjects = s3Objects.Contents?.filter((s3Object) => {
      const objectId = s3Object.Key;
      for (const key in where) {
        if (where[key] !== undefined && where[key] !== objectId) {
          return false;
        }
      }
      return true;
    });

    const data: BlobRepositoryType[] = [];
    const promises: Promise<void>[] = [];

    filteredObjects?.forEach((s3Object) => {
      const getObjectParams: S3.Types.GetObjectRequest = {
        Bucket: this.bucketName,
        Key: s3Object.Key || '',
      };

      promises.push(
        this.s3.getObject(getObjectParams).promise()
          .then((objectData) => {
            const objectId = s3Object.Key;
            const contentType = objectData.ContentType || ''; // Content type from S3 metadata

            data.push({
              id: objectId,
              v: 1, // Assuming a default version
              created_at: s3Object.LastModified || new Date(),
              updated_at: s3Object.LastModified || new Date(),
              location: this.s3.getSignedUrl('getObject', { Bucket: this.bucketName, Key: objectId }), // S3 object URL
              ext: contentType,
              file_name: objectId,
            });
          })
          .catch((error) => {
           
          })
      );
    });

    await Promise.all(promises);

    return { data, amount: data.length };
  }

  async create(data: Partial<BlobRepositoryType>): Promise<BlobRepositoryType> {
    if(!data.id) data.id = uuid();
    
    // Implement your create logic here (e.g., uploading a blob to S3)
    const params: S3.Types.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: data.id,
      Body: data.buffer,
      ContentType: data.ext,
    };

    const uploadResponse = await this.s3.upload(params).promise();

    // Assuming BlobRepositoryType properties are filled after the upload
    const createdData: BlobRepositoryType = {
      id: data.id,
      file_name: data.file_name,
      created_at: new Date(),
      updated_at: new Date(),
      location: uploadResponse.Location, // Adding the location property
      ext: data.ext,
      v: 1
    };

    return createdData;
  }

  async update(where: BlobRepositoryType, data: BlobRepositoryType): Promise<RepositoryUpdateResult> {
    // Implement your update logic here (e.g., copying or overwriting an existing S3 object)
    // You may need to handle the case where `where` and `data` specify different S3 objects
    // and update their metadata accordingly
    return { mutated: 0 }; // Placeholder, modify as needed
  }

  async delete(where: BlobRepositoryType): Promise<RepositoryDeleteResult> {
    // Implement your delete logic here (e.g., deleting an S3 object)
    // You may need to handle the case where multiple S3 objects are deleted
    const params: S3.Types.DeleteObjectRequest = {
      Bucket: this.bucketName,
      Key: where.id,
    };
    await this.s3.deleteObject(params).promise();

    return { deleted: 1 }; // Placeholder, modify as needed
  }
}

export { S3BlobRepository };
