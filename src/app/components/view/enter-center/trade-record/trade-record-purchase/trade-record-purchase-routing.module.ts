import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TradeRecordPurchaseComponent} from './trade-record-purchase.component';

const routes: Routes = [
  {
    path: 'tradeRecordPurchase',
    component: TradeRecordPurchaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeRecordPurchaseRoutingModule {
}

