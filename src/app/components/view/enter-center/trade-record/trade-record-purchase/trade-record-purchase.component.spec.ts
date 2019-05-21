import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeRecordPurchaseComponent } from './trade-record-purchase.component';

describe('TradeRecordPurchaseComponent', () => {
  let component: TradeRecordPurchaseComponent;
  let fixture: ComponentFixture<TradeRecordPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeRecordPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeRecordPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
