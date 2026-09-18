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
    getSignedUrl(key: string): Promise<string>;
    getSignedDownloadUrl(key: string): Promise<string>;
}

