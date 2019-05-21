import {NgModule} from '@angular/core';
import {ShareModule} from '../../../share.module';
import {DrawCashRoutingModule} from './draw-cash-routing.module';
import {DrawCashComponent} from './draw-cash.component';


@NgModule({
  imports: [
    ShareModule,
    DrawCashRoutingModule
  ],
  declarations: [
    DrawCashComponent
  ],
  exports: []
})
export class DrawCashModule {
}


