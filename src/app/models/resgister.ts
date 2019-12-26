import {
  required,
  minLength,
  maxLength
} from "@rxweb/reactive-form-validators";

export default class Resgister {
  @required()
  @maxLength({ value: 100 })
  public firstName: string;

  @required()
  @maxLength({ value: 100 })
  public lastName: string;

  @required({ message: "VALIDATIONS.DEFAULT" })
  public email: string;

  @required()
  @minLength({ value: 8 })
  public password: string;

  constructor(data) {
    Object.assign(this, data);
  }
}
