import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApplyForPurchaseComponent} from './apply-for-purchase.component';

const routes: Routes = [
  {
    path: 'applyForPurchase',
    component: ApplyForPurchaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplyForPurchaseRoutingModule {
}
