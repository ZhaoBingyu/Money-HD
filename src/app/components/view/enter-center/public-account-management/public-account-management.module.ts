import {NgModule} from '@angular/core';
import {ShareModule} from '../../../../share.module';
import {PublicAccountManagementRoutingModule} from './public-account-management-routing.module';
import {PublicAccountManagementComponent} from './public-account-management.component';

@NgModule({
  imports: [
    ShareModule,
    PublicAccountManagementRoutingModule
  ],
  declarations: [
    PublicAccountManagementComponent
  ],
  exports: []
})

export class PublicAccountManagementModule {
}


