import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RedeemPurchaseComponent} from './redeem-purchase.component';

const routes: Routes = [
  {
    path: 'redeemPurchase',
    component: RedeemPurchaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedeemPurchaseRoutingModule {
}
