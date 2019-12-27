import { Component, OnInit } from "@angular/core";
import { RxFormGroup, RxFormBuilder } from "@rxweb/reactive-form-validators";
import Register from "./models/resgister";
import { TranslateService } from "@ngx-translate/core";

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
  }

  public onLanguageChange({target}): void {
    this.translateService.use(target.value);
  }

  public getLanguages(): string[] {
    return this.translateService.getLangs();
  }

  public getCurrentLanguage(): string {
    return this.translateService.currentLang;
  }

  private setupTranslations() {
    this.translateService.addLangs(["en", "fr"]);
    this.translateService.setDefaultLang("en");

    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/en|fr/) ? browserLang : "en");
  }
}
