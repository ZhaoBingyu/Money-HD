import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TradeRecordProfitComponent} from './trade-record-profit.component';

const routes: Routes = [
  {
    path: 'tradeRecordProfit',
    component: TradeRecordProfitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeRecordProfitRoutingModule {
}

