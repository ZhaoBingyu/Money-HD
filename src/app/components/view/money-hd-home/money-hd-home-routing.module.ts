import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MoneyHdHomeComponent} from './money-hd-home.component';

const routes: Routes = [
  {
    path: 'moneyHDHome',
    component: MoneyHdHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyHdHomeRoutingModule {
}

