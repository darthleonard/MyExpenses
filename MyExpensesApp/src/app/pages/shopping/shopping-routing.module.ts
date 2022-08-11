import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingPage } from './shopping.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingPage
  },
  {
    path: 'shopping/shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then( m => m.ShoppingListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingPageRoutingModule {}
