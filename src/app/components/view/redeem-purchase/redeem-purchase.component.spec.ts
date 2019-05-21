import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemPurchaseComponent } from './redeem-purchase.component';

describe('RedeemPurchaseComponent', () => {
  let component: RedeemPurchaseComponent;
  let fixture: ComponentFixture<RedeemPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
