import * as _ from "lodash";

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AutoError } from "../models/auto-error.model";

export class TextValidator {
  public static regexMatch(
    regExp: RegExp,
    translationKey: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!_.isEmpty(control.value) && !regExp.test(control.value)) {
        return {
          regexPattern: new AutoError(translationKey, { values: { regExp } })
        };
      }
      return null;
    };
  }
}
