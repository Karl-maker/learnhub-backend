import { FileSystemBlobRepository } from "./fs";
import { S3BlobRepository } from "./s3";

const BlobRepository = {
    s3: S3BlobRepository,
    fs: FileSystemBlobRepository
}

export default BlobRepository;