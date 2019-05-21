import {NgModule} from '@angular/core';
import {ShareModule} from '../../../../share.module';
import {AccountInfoRoutingModule} from './account-info-routing.module';
import {AccountInfoComponent} from './account-info.component';

@NgModule({
  imports: [
    ShareModule,
    AccountInfoRoutingModule
  ],
  declarations: [
    AccountInfoComponent
  ],
  exports: []
})
export class AccountInfoModule {
}

