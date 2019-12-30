import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AutoErrorComponent } from "./auto-error.component";

describe("ControlErrorComponent", () => {
  let component: AutoErrorComponent;
  let fixture: ComponentFixture<AutoErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
