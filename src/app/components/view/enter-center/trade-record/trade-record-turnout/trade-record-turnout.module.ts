import {NgModule} from '@angular/core';
import {ShareModule} from '../../../../../share.module';
import {TradeRecordTurnoutRoutingModule} from './trade-record-turnout-routing.module';
import {TradeRecordTurnoutComponent} from './trade-record-turnout.component';

@NgModule({
  imports: [
    ShareModule,
    TradeRecordTurnoutRoutingModule
  ],
  declarations: [
    TradeRecordTurnoutComponent
  ],
  exports: []
})

export class TradeRecordTurnoutModule {
}


