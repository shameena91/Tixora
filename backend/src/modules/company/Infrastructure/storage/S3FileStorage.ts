import { env } from "../../../../config/env";
import { IFileStoragePort } from "../../application/ports/IFileStoragePort";
import { S3Client,  PutObjectCommand, } from "@aws-sdk/client-s3";
export class S3FileStorage implements IFileStoragePort {

 private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region:env.awsregion,
    });
  }



    async upload(
  file: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> {
const command = new PutObjectCommand({
  Bucket: env.awsBucketName,
  Key: fileName,
  Body: file,
  ContentType: mimeType,
});
  await this.s3Client.send(command);
  const fileUrl = `https://${env.awsBucketName}.s3.${env.awsregion}.amazonaws.com/${fileName}`;

return fileUrl;
}
}