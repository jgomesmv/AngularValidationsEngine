import { Component, OnInit } from "@angular/core";
import { RxFormGroup, RxFormBuilder } from "@rxweb/reactive-form-validators";
import Register from "./models/resgister";
import { TranslateService } from "@ngx-translate/core";
import { TextValidator } from "./validations-module/validators/text.validator";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public registerFormGroup: RxFormGroup;
  public register: Register = new Register({});

  public constructor(
    private formBuilder: RxFormBuilder,
    private translateService: TranslateService
  ) {
    this.setupTranslations();
  }

  public ngOnInit() {
    this.registerFormGroup = this.formBuilder.formGroup(
      this.register
    ) as RxFormGroup;

    const emailControl = this.registerFormGroup.controls.email as FormControl;
    const emailValidator = emailControl.validator;
    emailControl.setValidators([
      TextValidator.regexMatch(/\S+@\S+\.\S+/, "VALIDATIONS.EMAIL_FORMAT"),
      TextValidator.hasWords(
        ["example", "test", "123"],
        "VALIDATIONS.EMAIL_FORBIDDEN_WORDS"
      ),
      emailValidator
    ]);
  }

  public onLanguageChange({ target }): void {
    this.translateService.use(target.value);
  }

  public getLanguages(): string[] {
    return this.translateService.getLangs();
  }

  public getCurrentLanguage(): string {
    return this.translateService.currentLang;
  }

  public onSubmit(): void {
    // Show default error with alert message
    const emailFormControl = this.registerFormGroup.controls.email;
    if (emailFormControl.errors && emailFormControl.errors.hasWordsError) {
      const error = emailFormControl.errors.hasWordsError;
      alert(
        this.translateService.instant(error.errorTranslation, {
          values: error.values
        })
      );
    }
  }

  public onCancel(): void {
    this.registerFormGroup.resetForm();
  }

  private setupTranslations() {
    this.translateService.addLangs(["en", "fr"]);
    this.translateService.setDefaultLang("en");

    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/en|fr/) ? browserLang : "en");
  }
}
