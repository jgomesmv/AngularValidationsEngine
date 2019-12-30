import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AutoErrorComponent } from "./components/auto-error/auto-error.component";
import { ControlErrorsDirective } from "./directives/control-errors/control-errors.directive";
import { ControlErrorContainerDirective } from "./directives/control-error-container/control-error-container.directive";
import { FormSubmitDirective } from "./directives/form-submit/form-submit.directive";
import { ReactiveFormsModule } from "@angular/forms";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    AutoErrorComponent,
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    FormSubmitDirective
  ],
  entryComponents: [AutoErrorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    AutoErrorComponent,
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    FormSubmitDirective,
    ReactiveFormsModule,
    RxReactiveFormsModule
  ]
})
export class ValidationsModule {}
