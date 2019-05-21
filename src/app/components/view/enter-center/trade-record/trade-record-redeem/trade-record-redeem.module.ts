import {NgModule} from '@angular/core';
import {ShareModule} from '../../../../../share.module';
import {TradeRecordRedeemRoutingModule} from './trade-record-redeem-routing.module';
import {TradeRecordRedeemComponent} from './trade-record-redeem.component';

@NgModule({
  imports: [
    ShareModule,
    TradeRecordRedeemRoutingModule
  ],
  declarations: [
    TradeRecordRedeemComponent
  ],
  exports: []
})

export class TradeRecordRedeemModule {
}


