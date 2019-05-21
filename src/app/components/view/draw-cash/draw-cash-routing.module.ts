import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DrawCashComponent} from './draw-cash.component';

const routes: Routes = [
  {
    path: 'drawCash',
    component: DrawCashComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrawCashRoutingModule {
}
