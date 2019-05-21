import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TradeRecordRedeemComponent} from './trade-record-redeem.component';

const routes: Routes = [
  {
    path: 'tradeRecordRedeem',
    component: TradeRecordRedeemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeRecordRedeemRoutingModule {
}

