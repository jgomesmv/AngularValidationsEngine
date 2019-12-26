export class DefaultError {
  public translation: string;
  public translationValues: object;

  constructor(translation: string, values: object) {
    this.translation = translation;
    this.translationValues = values;
  }
}
