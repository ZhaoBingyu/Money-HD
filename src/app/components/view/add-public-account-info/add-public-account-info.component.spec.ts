import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPublicAccountInfoComponent } from './add-public-account-info.component';

describe('AddPublicAccountInfoComponent', () => {
  let component: AddPublicAccountInfoComponent;
  let fixture: ComponentFixture<AddPublicAccountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPublicAccountInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPublicAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
