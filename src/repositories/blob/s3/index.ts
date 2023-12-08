import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { IBlobRepository, BlobRepositoryType } from '../interface';
import { RepositoryFindOptions, RepositoryFindResult, RepositoryUpdateResult, RepositoryDeleteResult } from '../../base/interface';

class S3BlobRepository implements IBlobRepository {
  private s3: S3;
  private bucketName: string;

  constructor(s3: S3, bucketName: string) {
    this.s3 = s3;
    this.bucketName = bucketName;
  }

  async find(where: Partial<BlobRepositoryType>, options?: RepositoryFindOptions<BlobRepositoryType>): Promise<RepositoryFindResult<BlobRepositoryType>> {
    // Implement your find logic here (e.g., listing objects in the S3 bucket)
    // You may need to map S3 object metadata to BlobRepositoryType properties
    const data: BlobRepositoryType[] = [];
    const amount: number = 0;
    return { data, amount };
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
      v: 0
    };

    return createdData;
  }

  async update(where: Partial<BlobRepositoryType>, data: Partial<BlobRepositoryType>): Promise<RepositoryUpdateResult> {
    // Implement your update logic here (e.g., copying or overwriting an existing S3 object)
    // You may need to handle the case where `where` and `data` specify different S3 objects
    // and update their metadata accordingly
    return { mutated: 0 }; // Placeholder, modify as needed
  }

  async delete(where: Partial<BlobRepositoryType>): Promise<RepositoryDeleteResult> {
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
