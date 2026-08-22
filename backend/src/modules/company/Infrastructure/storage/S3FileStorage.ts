import { env } from "../../../../config/env";
import { IFileStoragePort } from "../../application/ports/IFileStoragePort";
import { S3Client,  PutObjectCommand, DeleteObjectCommand, } from "@aws-sdk/client-s3";



export class S3FileStorage implements IFileStoragePort {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: env.awsregion,
    });
  }

  async upload(
    file: Buffer,
    fileName: string,
    mimeType: string,
    path: string
  ): Promise<{
    url: string;
    key: string;
  }> {
    const uniqueFileName = `${Date.now()}-${fileName}`;

    const key = `${path}/${uniqueFileName}`;
console.log("Bucket name",env.awsBucketName,)
    const command = new PutObjectCommand({
      Bucket:env.awsBucketName,
      Key: key,
      Body: file,
      ContentType: mimeType,
    });

    await this.s3Client.send(command);

    const url =
      `https://${env.awsBucketName}.s3.${env.awsregion}.amazonaws.com/${key}`;

    return {
      url,
      key,
    };
  }

  async delete(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: env.awsBucketName,
      Key: key,
    });

    await this.s3Client.send(command);
  }
}