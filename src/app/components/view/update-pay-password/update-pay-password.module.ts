import {NgModule} from '@angular/core';
import {ShareModule} from '../../../share.module';
import {UpdatePayPasswordRoutingModule} from './update-pay-password-routing.module';
import {UpdatePayPasswordComponent} from './update-pay-password.component';

@NgModule({
  imports: [
    ShareModule,
    UpdatePayPasswordRoutingModule
  ],
  declarations: [
    UpdatePayPasswordComponent
  ],
  exports: []
})
export class UpdatePayPasswordModule {
}


