import { AbstractControl, NgControl } from "@angular/forms";
import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  Optional,
  ViewContainerRef,
  OnDestroy
} from "@angular/core";
import { EMPTY, Observable, Subject, fromEvent, merge } from "rxjs";

import { AutoErrorComponent } from "../../components/auto-error/auto-error.component";
import { ControlErrorContainerDirective } from "../control-error-container/control-error-container.directive";
import { ErrorHelper } from "../../helpers/error-helper";
import { FormSubmitDirective } from "../form-submit/form-submit.directive";
import { AutoError } from "../../models/auto-error.model";
import { takeUntil } from "rxjs/operators";

// This directive will manage the user interaction with
// a formControl instance
@Directive({
  selector: "[formControl], [formControlName]"
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  @Input() public fieldNameTranslation = "";

  public autoErrorComponentRef: ComponentRef<AutoErrorComponent>;
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
    private directiveControl: NgControl
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
    ).pipe(takeUntil(this.destroySubject))
      .subscribe(() => {
        if (this.autoErrorComponentRef) {
          this.setAutoError(null);
        }

        const controlErrors = this.control.errors;
        if (controlErrors) {
          const error = ErrorHelper.getError(
            this.fieldNameTranslation,
            controlErrors
          );

          // Only auto errors must be handled
          if (error instanceof AutoError) {
            this.setAutoError(error);
            this.control.markAsTouched();
          }
        }
      });
  }

  public ngOnDestroy() {
    this.destroySubject.complete();
  }

  private setAutoError(autoError: AutoError): void {
    if (!this.autoErrorComponentRef) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        AutoErrorComponent
      );
      this.autoErrorComponentRef = this.controlViewContainerRef.createComponent(
        componentFactory
      );
    }

    this.autoErrorComponentRef.instance.autoError = autoError;
  }

  private get control(): AbstractControl {
    return this.directiveControl.control;
  }

  private setupEvents(): void {
    // Input touched event
    this.touchObservableEvent = fromEvent(
      this.viewContainerRef.element.nativeElement,
      "blur"
    );
    // Form submit event
    this.submitObservableEvent = this.formSubmitDirective
      ? this.formSubmitDirective.submitObservableEvent
      : EMPTY;
  }

  private setupControlErrorContainer(): void {
    // Render error component as a sibling of the form control element
    // or as sibling of container element using the controlErrorContainer attribute
    this.controlViewContainerRef = this.controlErrorContainerDirective
      ? this.controlErrorContainerDirective.viewContainerRef
      : this.viewContainerRef;
  }
}
