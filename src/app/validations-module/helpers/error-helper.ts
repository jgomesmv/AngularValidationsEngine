import { CustomError } from "../models/custom-error.model";
import { DefaultError } from "../models/default-error.model";
import { ValidationErrors } from "@angular/forms";

export class ErrorHelper {
  private static defaultErrors = {
    required: (errorData) => {
      const translation = ErrorHelper.getTranslation(errorData, "VALIDATIONS.REQUIRED");
      return new DefaultError(translation, null);
    },
    minLength: (errorData) => {
      const translation = ErrorHelper.getTranslation(errorData, "VALIDATIONS.MIN_LENGTH");
      const translationValues = ErrorHelper.getTranslationValues(errorData);
      return new DefaultError(translation, translationValues);
    },
    maxLength: (errorData) => {
      const translation = ErrorHelper.getTranslation(errorData, "VALIDATIONS.MAX_LENGTH");
      const translationValues = ErrorHelper.getTranslationValues(errorData);
      return new DefaultError(translation, translationValues);
    }
  };

  private static getTranslation(errorData: any, defaultTranslation: string) {
    return errorData.message ? errorData.message : defaultTranslation;
  }

  private static getTranslationValues(errorData: any) {
    if (errorData.refValues && errorData.refValues.length > 1) {
      return { length: errorData.refValues[1] };
    }
    return null;
  }

  public static getError(validationErrors: ValidationErrors): DefaultError | CustomError {
    const firstKey = Object.keys(validationErrors)[0];
    if (ErrorHelper.defaultErrors[firstKey]) {
      return ErrorHelper.defaultErrors[firstKey].call(this, validationErrors[firstKey]);
    } else if (validationErrors[firstKey] instanceof DefaultError || validationErrors[firstKey] instanceof CustomError) {
      return validationErrors[firstKey];
    } else {
      throw Error("Validation error without default or custom message set!");
    }
  }
}


