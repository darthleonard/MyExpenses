import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingShellPage } from './shopping-shell.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingShellPage,
    children: [
      {
        path: 'shoppings',
        loadChildren: () => import('./shoppings/shoppings.module').then( m => m.ShoppingsPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path: 'stores',
        loadChildren: () => import('./stores/stores.module').then( m => m.StoresPageModule)
      },
      {
        path: '',
        redirectTo: 'shoppings',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'shopping-list/:id',
    loadChildren: () => import('./shoppings/shopping-list/shopping-list.module').then( m => m.ShoppingListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingShellPageRoutingModule {}
