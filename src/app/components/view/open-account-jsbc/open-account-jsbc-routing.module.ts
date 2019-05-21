import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OpenAccountJsbcComponent} from './open-account-jsbc.component';

const routes: Routes = [
  {
    path: 'openAccountJSBC',
    component: OpenAccountJsbcComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenAccountJsbcRoutingModule {
}

