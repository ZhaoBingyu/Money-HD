import {NgModule} from '@angular/core';
import {ShareModule} from '../../../share.module';
import {UpdateLoginPasswordRoutingModule} from './update-login-password-routing.module';
import {UpdateLoginPasswordComponent} from './update-login-password.component';

@NgModule({
  imports: [
    ShareModule,
    UpdateLoginPasswordRoutingModule
  ],
  declarations: [
    UpdateLoginPasswordComponent
  ],
  exports: []
})
export class UpdateLoginPasswordModule {
}


