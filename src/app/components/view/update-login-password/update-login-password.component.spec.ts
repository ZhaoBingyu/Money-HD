import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLoginPasswordComponent } from './update-login-password.component';

describe('UpdateLoginPasswordComponent', () => {
  let component: UpdateLoginPasswordComponent;
  let fixture: ComponentFixture<UpdateLoginPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLoginPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLoginPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
