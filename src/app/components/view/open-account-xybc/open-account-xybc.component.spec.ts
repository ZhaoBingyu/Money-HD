import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAccountXybcComponent } from './open-account-xybc.component';

describe('OpenAccountXybcComponent', () => {
  let component: OpenAccountXybcComponent;
  let fixture: ComponentFixture<OpenAccountXybcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenAccountXybcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAccountXybcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
