import { AbstractControl, NgControl } from "@angular/forms";
import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Inject,
  Input,
  OnInit,
  Optional,
  ViewContainerRef
} from "@angular/core";
import { EMPTY, Observable, Subject, fromEvent, merge } from "rxjs";

import { ControlErrorComponent } from "../../components/control-error/control-error.component";
import { ControlErrorContainerDirective } from "../control-error-container/control-error-container.directive";
import { ErrorHelper } from "../../helpers/error-helper";
import { FormSubmitDirective } from "../form-submit/form-submit.directive";
import { DefaultError } from "../../models/default-error.model";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

// This directive will manage the user interaction with
// a formControl instance
@Directive({
  selector: "[formControl], [formControlName]"
})
export class ControlErrorsDirective implements OnInit {
  @Input() public label = "";

  public controlErrorComponentRef: ComponentRef<ControlErrorComponent>;
  public controlViewContainerRef: ViewContainerRef;

  public touchObservableEvent: Observable<Event>;
  public submitObservableEvent: Observable<Event>;
  public destroySubject: Subject<void> = new Subject();

  public constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Optional()
    private controlErrorContainerDirective: ControlErrorContainerDirective,
    @Optional() private formSubmitDirective: FormSubmitDirective,
    private directiveControl: NgControl,
    public translateService: TranslateService
  ) {
    this.setupEvents();
    this.setupControlErrorContainer();
  }

  public ngOnInit() {
    merge(
      this.touchObservableEvent,
      this.control.valueChanges,
      this.submitObservableEvent,
      this.control.statusChanges
    )
      .pipe(takeUntil(this.destroySubject))
      .subscribe(() => {
        const controlErrors = this.control.errors;
        if (controlErrors) {
          const error = ErrorHelper.getError(controlErrors);

          // Only default errors must be handled
          // Custom errors are handled by custom validatiors
          if (error instanceof DefaultError) {
            this.setError(error);
            this.control.markAsTouched();
          }
        } else if (this.controlErrorComponentRef) {
          this.setError(null);
        }
      });
  }

  public setError(error: DefaultError): void {
    let errorText = null;
    if (error) {
      errorText = this.translateService.instant(
        error.translation,
        error.translationValues
      );
      errorText = this.label ? `${this.label} ${errorText}` : errorText;
    }

    if (!this.controlErrorComponentRef) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        ControlErrorComponent
      );
      this.controlErrorComponentRef = this.controlViewContainerRef.createComponent(
        componentFactory
      );
    }

    this.controlErrorComponentRef.instance.text = errorText;
  }

  private get control(): AbstractControl {
    return this.directiveControl.control;
  }

  private setupEvents(): void {
    // Event when input is touched
    this.touchObservableEvent = fromEvent(
      this.viewContainerRef.element.nativeElement,
      "blur"
    );
    // Event when form is submited
    this.submitObservableEvent = this.formSubmitDirective
      ? this.formSubmitDirective.submitObservableEvent
      : EMPTY;
  }

  private setupControlErrorContainer(): void {
    // Render error component as a sibling of the input tag
    // or as part of a error container element using the controlErrorContainer attribute
    this.controlViewContainerRef = this.controlErrorContainerDirective
      ? this.controlErrorContainerDirective.viewContainerRef
      : this.viewContainerRef;
  }
}
