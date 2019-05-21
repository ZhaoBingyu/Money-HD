import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OpenAccountXybcComponent} from './open-account-xybc.component';

const routes: Routes = [
  {
    path: 'openAccountXTBC',
    component: OpenAccountXybcComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenAccountXybcRoutingModule {
}

