export interface IFileStoragePort {
  upload(
    file: Buffer,
    fileName: string,
    mimeType: string,
    path: string
  ): Promise<{
    url: string;
    key: string;
  }>;

  delete(key: string): Promise<void>;
}