import * as _ from "lodash";

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AutoError } from "../models/auto-error.model";
import { DefaultError } from "../models/default-error.model";

export class TextValidator {
  public static regexMatch(
    regExp: RegExp,
    translationKey: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!_.isEmpty(control.value) && !regExp.test(control.value)) {
        return {
          regexPattern: new AutoError("", translationKey, {
            values: { regExp }
          })
        };
      }
      return null;
    };
  }

  public static hasWords(words: string[], translationKey: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (_.some(words, word => _.includes(control.value, word))) {
        return {
          hasWordsError: new DefaultError({
            errorTranslation: translationKey,
            values: words.join(", ")
          })
        };
      }
      return null;
    };
  }
}
