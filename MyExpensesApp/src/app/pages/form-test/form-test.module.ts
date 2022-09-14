import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormTestPageRoutingModule } from './form-test-routing.module';

import { FormTestPage } from './form-test.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormTestPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FormTestPage]
})
export class FormTestPageModule {}
