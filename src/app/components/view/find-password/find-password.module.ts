import {NgModule} from '@angular/core';
import {ShareModule} from '../../../share.module';
import {FindPasswordRoutingModule} from './find-password-routing.module';
import {FindPasswordComponent} from './find-password.component';

@NgModule({
  imports: [
    ShareModule,
    FindPasswordRoutingModule
  ],
  declarations: [
    FindPasswordComponent
  ],
  exports: []
})

export class FindPasswordModule {
}


