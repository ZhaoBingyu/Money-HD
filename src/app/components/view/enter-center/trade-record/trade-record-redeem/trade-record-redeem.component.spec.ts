import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeRecordRedeemComponent } from './trade-record-redeem.component';

describe('TradeRecordRedeemComponent', () => {
  let component: TradeRecordRedeemComponent;
  let fixture: ComponentFixture<TradeRecordRedeemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeRecordRedeemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeRecordRedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
