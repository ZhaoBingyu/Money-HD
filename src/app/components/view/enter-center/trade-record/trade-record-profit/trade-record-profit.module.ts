import {NgModule} from '@angular/core';
import {ShareModule} from '../../../../../share.module';
import {TradeRecordProfitRoutingModule} from './trade-record-profit-routing.module';
import {TradeRecordProfitComponent} from './trade-record-profit.component';

@NgModule({
  imports: [
    ShareModule,
    TradeRecordProfitRoutingModule
  ],
  declarations: [
    TradeRecordProfitComponent
  ],
  exports: []
})

export class TradeRecordProfitModule {
}


