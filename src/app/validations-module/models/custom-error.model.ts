export class CustomError {
  public error: any;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
