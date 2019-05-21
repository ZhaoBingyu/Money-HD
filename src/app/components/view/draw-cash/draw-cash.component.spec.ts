import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawCashComponent } from './draw-cash.component';

describe('DrawCashComponent', () => {
  let component: DrawCashComponent;
  let fixture: ComponentFixture<DrawCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
