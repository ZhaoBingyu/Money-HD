import {NgModule} from '@angular/core';
import {ShareModule} from '../../../../share.module';
import {MyAssetsRoutingModule} from './my-assets-routing.module';
import {MyAssetsComponent} from './my-assets.component';

@NgModule({
  imports: [
    ShareModule,
    MyAssetsRoutingModule
  ],
  declarations: [
    MyAssetsComponent
  ],
  exports: []
})
export class MyAssetsModule {
}

