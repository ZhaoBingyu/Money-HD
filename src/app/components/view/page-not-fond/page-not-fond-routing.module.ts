import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFondComponent} from './page-not-fond.component';

const routes: Routes = [
  {
    path: '**',
    component: PageNotFondComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageNotFondRoutingModule {
}
