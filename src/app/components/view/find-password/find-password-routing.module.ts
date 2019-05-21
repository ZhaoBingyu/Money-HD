import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FindPasswordComponent} from './find-password.component';

const routes: Routes = [
  {
    path: 'findPassword',
    component: FindPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindPasswordRoutingModule {
}
