import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UpdateLoginPasswordComponent} from './update-login-password.component';

const routes: Routes = [
  {
    path: 'updateLoginPassword',
    component: UpdateLoginPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateLoginPasswordRoutingModule {
}
