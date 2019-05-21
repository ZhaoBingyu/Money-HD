import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeRecordProfitComponent } from './trade-record-profit.component';

describe('TradeRecordProfitComponent', () => {
  let component: TradeRecordProfitComponent;
  let fixture: ComponentFixture<TradeRecordProfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeRecordProfitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeRecordProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
