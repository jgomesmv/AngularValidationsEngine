import { Directive, ElementRef } from "@angular/core";
import { shareReplay, tap } from "rxjs/operators";

import { fromEvent } from "rxjs";

// This directive will handle the user form
// submit without any previous interaction
@Directive({
  selector: "form"
})
export class FormSubmitDirective {
  public submitObservableEvent = fromEvent(this.element, "submit").pipe(
    tap(() => {
      if (!this.element.classList.contains("submitted")) {
        this.element.classList.add("submitted");
      }
    }),
    shareReplay(1)
  );

  public constructor(private elementRef: ElementRef<HTMLFormElement>) { }

  public get element(): HTMLFormElement {
    return this.elementRef.nativeElement;
  }
}
