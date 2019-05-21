import {NgModule} from '@angular/core';
import {ShareModule} from '../../../../../share.module';
import {TradeRecordPurchaseRoutingModule} from './trade-record-purchase-routing.module';
import {TradeRecordPurchaseComponent} from './trade-record-purchase.component';

@NgModule({
  imports: [
    ShareModule,
    TradeRecordPurchaseRoutingModule
  ],
  declarations: [
    TradeRecordPurchaseComponent
  ],
  exports: []
})

export class TradeRecordPurchaseModule {
}


