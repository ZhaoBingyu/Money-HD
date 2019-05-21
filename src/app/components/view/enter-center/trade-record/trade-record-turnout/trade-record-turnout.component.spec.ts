import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeRecordTurnoutComponent } from './trade-record-turnout.component';

describe('TradeRecordTurnoutComponent', () => {
  let component: TradeRecordTurnoutComponent;
  let fixture: ComponentFixture<TradeRecordTurnoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeRecordTurnoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeRecordTurnoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
