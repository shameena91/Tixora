export interface IFileStoragePort {
  upload(
    file: Buffer,
    fileName: string,
    mimeType: string
  ): Promise<string>;
}