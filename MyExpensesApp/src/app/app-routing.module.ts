import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'form-test',
  //   pathMatch: 'full'
  // },
  
  {
    path: '',
    redirectTo: 'shopping',
    pathMatch: 'full'
  },

  {
    path: 'fuel',
    loadChildren: () => import('./pages/fuel/fuel.module').then( m => m.FuelPageModule)
  },
  {
    path: 'form-test',
    loadChildren: () => import('./pages/form-test/form-test.module').then( m => m.FormTestPageModule)
  },
  {
    path: 'shopping',
    loadChildren: () => import('./pages/shopping/shopping.module').then( m => m.ShoppingPageModule)
  },
  {
    path: 'house',
    loadChildren: () => import('./pages/house/house.module').then( m => m.HousePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
