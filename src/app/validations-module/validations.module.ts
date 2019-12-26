import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlErrorComponent } from "./components/control-error/control-error.component";
import { ControlErrorsDirective } from "./directives/control-errors/control-errors.directive";
import { ControlErrorContainerDirective } from "./directives/control-error-container/control-error-container.directive";
import { FormSubmitDirective } from "./directives/form-submit/form-submit.directive";
import { ReactiveFormsModule } from "@angular/forms";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";

@NgModule({
  declarations: [
    ControlErrorComponent,
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    FormSubmitDirective
  ],
  entryComponents: [ControlErrorComponent],
  imports: [CommonModule, ReactiveFormsModule, RxReactiveFormsModule],
  exports: [
    ControlErrorComponent,
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    FormSubmitDirective,
    ReactiveFormsModule,
    RxReactiveFormsModule
  ]
})
export class ValidationsModule {}
