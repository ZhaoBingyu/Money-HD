import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyHdHomeComponent } from './money-hd-home.component';

describe('MoneyHdHomeComponent', () => {
  let component: MoneyHdHomeComponent;
  let fixture: ComponentFixture<MoneyHdHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyHdHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyHdHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
