import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PublicAccountManagementComponent} from './public-account-management.component';

const routes: Routes = [
  {
    path: 'publicAccountMangement',
    component: PublicAccountManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicAccountManagementRoutingModule {
}

