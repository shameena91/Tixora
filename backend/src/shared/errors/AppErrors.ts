export class AppErrors extends Error {
  public readonly errorCode: string|number;

  constructor(
    message: string,
    errorCode:string| number
  ) {
    super(message);

    this.errorCode = errorCode;

    Error.captureStackTrace(this, this.constructor);
  }
}