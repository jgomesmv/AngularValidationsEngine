import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from "@angular/core";
import { AutoError } from "../../models/auto-error.model";
import _ from "lodash";

@Component({
  templateUrl: "./auto-error.component.html",
  styleUrls: ["./auto-error.component.scss"],
  host: { class: "c-autoError" },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoErrorComponent {
  // tslint:disable-next-line: variable-name
  private _autoError: AutoError = new AutoError("", "", {});
  // tslint:disable-next-line: variable-name
  private _hide = true;

  public constructor(private cdr: ChangeDetectorRef) {}

  @Input() public set autoError(value) {
    if (!_.isEqual(this._autoError, value)) {
      this._autoError = value;
      this._hide = !this._autoError;
      this.cdr.detectChanges();
    }
  }

  public get autoError() {
    return this._autoError;
  }

  public get hide() {
    return this._hide;
  }
}
