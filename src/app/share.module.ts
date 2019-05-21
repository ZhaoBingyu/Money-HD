import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './components/common/header/header.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {FixHeightDirective} from './directive/fix-height.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FixHeightDirective,
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    FixHeightDirective,
  ],
})
export class ShareModule {
}
