import {NgModule} from '@angular/core';
import {ShareModule} from '../../../share.module';
import {OpenAccountJsbcRoutingModule} from './open-account-jsbc-routing.module';
import {OpenAccountJsbcComponent} from './open-account-jsbc.component';

@NgModule({
  imports: [
    ShareModule,
    OpenAccountJsbcRoutingModule
  ],
  declarations: [
    OpenAccountJsbcComponent
  ],
  exports: []
})

export class OpenAccountJsbcModule {
}


