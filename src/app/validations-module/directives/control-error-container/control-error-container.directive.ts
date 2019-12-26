import { Directive, ViewContainerRef } from "@angular/core";

// This directive will set its host element has the container of all
// formControl error messages rendered by the control error component

@Directive({
  selector: "[controlErrorContainer]"
})
export class ControlErrorContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
