import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAccountJsbcComponent } from './open-account-jsbc.component';

describe('OpenAccountJsbcComponent', () => {
  let component: OpenAccountJsbcComponent;
  let fixture: ComponentFixture<OpenAccountJsbcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenAccountJsbcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAccountJsbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
