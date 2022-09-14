import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingsPage } from './shoppings.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingsPageRoutingModule {}
