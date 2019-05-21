import {NgModule} from '@angular/core';
import {ShareModule} from '../../../share.module';
import {PageNotFondRoutingModule} from './page-not-fond-routing.module';
import {PageNotFondComponent} from './page-not-fond.component';

@NgModule({
  imports: [
    ShareModule,
    PageNotFondRoutingModule
  ],
  declarations: [
    PageNotFondComponent
  ],
  exports: []
})
export class PageNotFondModule {
}


