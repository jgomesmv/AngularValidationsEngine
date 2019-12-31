import { DefaultError } from "../models/default-error.model";
import { AutoError } from "../models/auto-error.model";
import { ValidationErrors } from "@angular/forms";

export class ErrorHelper {
  private static autoErrors = {
    required: (fieldNameTranslation, errorData) => {
      const errorTranslation = ErrorHelper.getTranslation(
        errorData,
        "VALIDATIONS.REQUIRED"
      );
      return new AutoError(fieldNameTranslation, errorTranslation, null);
    },
    minLength: (fieldNameTranslation, errorData) => {
      const errorTranslation = ErrorHelper.getTranslation(
        errorData,
        "VALIDATIONS.MIN_LENGTH"
      );
      const values = ErrorHelper.getTranslationValues(errorData);
      return new AutoError(fieldNameTranslation, errorTranslation, values);
    },
    maxLength: (fieldNameTranslation, errorData) => {
      const errorTranslation = ErrorHelper.getTranslation(
        errorData,
        "VALIDATIONS.MAX_LENGTH"
      );
      const values = ErrorHelper.getTranslationValues(errorData);
      return new AutoError(fieldNameTranslation, errorTranslation, values);
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

  public static getError(
    fieldNameTranslation: string,
    validationErrors: ValidationErrors
  ): AutoError | DefaultError {
    const firstKey = Object.keys(validationErrors)[0];
    if (ErrorHelper.autoErrors[firstKey]) {
      return ErrorHelper.autoErrors[firstKey].call(
        this,
        fieldNameTranslation,
        validationErrors[firstKey]
      );
    } else if (
      validationErrors[firstKey] instanceof AutoError ||
      validationErrors[firstKey] instanceof DefaultError
    ) {
      return validationErrors[firstKey];
    } else {
      throw Error("Validation error without auto or default message set!");
    }
  }
}
