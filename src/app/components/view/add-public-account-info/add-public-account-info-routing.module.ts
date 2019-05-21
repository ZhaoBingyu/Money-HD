import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddPublicAccountInfoComponent} from './add-public-account-info.component';

const routes: Routes = [
  {
    path: 'addPubAccountInfo',
    component: AddPublicAccountInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPublicAccountInfoRoutingModule {
}
