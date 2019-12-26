import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from "@angular/core";

@Component({
  templateUrl: "./control-error.component.html",
  styleUrls: ["./control-error.component.scss"],
  host: {class: "c-controlError"},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {
  // tslint:disable-next-line: variable-name
  private _text: any;
  // tslint:disable-next-line: variable-name
  private _hide = true;

  @Input() public set text(value) {
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;
      this.cdr.detectChanges();
    }
  }

  public get text() {
    return this._text;
  }

  public get hide() {
    return this._hide;
  }

  public constructor(private cdr: ChangeDetectorRef) { }

}

