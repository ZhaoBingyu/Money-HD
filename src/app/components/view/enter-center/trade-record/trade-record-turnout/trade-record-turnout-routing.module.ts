import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TradeRecordTurnoutComponent} from './trade-record-turnout.component';

const routes: Routes = [
  {
    path: 'tradeRecordTurnout',
    component: TradeRecordTurnoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeRecordTurnoutRoutingModule {
}

