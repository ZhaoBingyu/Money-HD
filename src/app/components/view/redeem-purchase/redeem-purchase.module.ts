import {NgModule} from '@angular/core';
import {ShareModule} from '../../../share.module';
import {RedeemPurchaseRoutingModule} from './redeem-purchase-routing.module';
import {RedeemPurchaseComponent} from './redeem-purchase.component';

@NgModule({
  imports: [
    ShareModule,
    RedeemPurchaseRoutingModule
  ],
  declarations: [
    RedeemPurchaseComponent
  ],
  exports: []
})
export class RedeemPurchaseModule {
}


