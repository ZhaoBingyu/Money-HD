import {NgModule} from '@angular/core';
import {ShareModule} from '../../../share.module';
import {ApplyForPurchaseRoutingModule} from './apply-for-purchase-routing.module';
import {ApplyForPurchaseComponent} from './apply-for-purchase.component';

@NgModule({
  imports: [
    ShareModule,
    ApplyForPurchaseRoutingModule
  ],
  declarations: [
    ApplyForPurchaseComponent
  ],
  exports: []
})

export class ApplyForPurchaseModule {
}


