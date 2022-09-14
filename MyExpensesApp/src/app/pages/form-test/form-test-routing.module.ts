import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormTestPage } from './form-test.page';

const routes: Routes = [
  {
    path: '',
    component: FormTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormTestPageRoutingModule {}
