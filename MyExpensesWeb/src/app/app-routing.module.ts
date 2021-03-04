import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Dashboard2Component } from './pages/dashboard2/dashboard2.component';

const routes: Routes = [
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Dashboard2', component: Dashboard2Component },
  { path: '**', component: Dashboard2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
