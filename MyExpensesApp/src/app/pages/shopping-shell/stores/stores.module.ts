import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoresPageRoutingModule } from './stores-routing.module';

import { StoresPage } from './stores.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    StoresPageRoutingModule
  ],
  declarations: [StoresPage]
})
export class StoresPageModule {}
