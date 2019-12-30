export class DefaultError {
  public errorTranslation: string;
  public values: object;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
