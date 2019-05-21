import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UpdatePayPasswordComponent} from './update-pay-password.component';

const routes: Routes = [
  {
    path: 'updatePayPassword',
    component: UpdatePayPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatePayPasswordRoutingModule {
}
