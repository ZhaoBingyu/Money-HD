import {NgModule} from '@angular/core';
import {ShareModule} from '../../../share.module';
import {AddPublicAccountInfoRoutingModule} from './add-public-account-info-routing.module';
import {AddPublicAccountInfoComponent} from './add-public-account-info.component';

@NgModule({
  imports: [
    ShareModule,
    AddPublicAccountInfoRoutingModule
  ],
  declarations: [
    AddPublicAccountInfoComponent
  ],
  exports: []
})

export class AddPublicAccountInfoModule {
}


