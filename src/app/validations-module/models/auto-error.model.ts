export class AutoError {
  public fieldNameTranslation: string;
  public errorTranslation: string;
  public values: object;

  constructor(
    fieldNameTranslation: string,
    errorTranslation: string,
    values: object
  ) {
    this.fieldNameTranslation = fieldNameTranslation;
    this.errorTranslation = errorTranslation;
    this.values = values;
  }
}
