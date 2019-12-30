export class DefaultError {
  public error: any;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
