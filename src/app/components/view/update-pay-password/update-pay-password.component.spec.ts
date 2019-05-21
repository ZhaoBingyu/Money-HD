import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePayPasswordComponent } from './update-pay-password.component';

describe('UpdatePayPasswordComponent', () => {
  let component: UpdatePayPasswordComponent;
  let fixture: ComponentFixture<UpdatePayPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePayPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePayPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
