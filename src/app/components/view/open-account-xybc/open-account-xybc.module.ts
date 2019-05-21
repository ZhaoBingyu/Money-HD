import {NgModule} from '@angular/core';
import {ShareModule} from '../../../share.module';
import {OpenAccountXybcRoutingModule} from './open-account-xybc-routing.module';
import {OpenAccountXybcComponent} from './open-account-xybc.component';

@NgModule({
  imports: [
    ShareModule,
    OpenAccountXybcRoutingModule
  ],
  declarations: [
    OpenAccountXybcComponent
  ],
  exports: []
})

export class OpenAccountXybcModule {
}


