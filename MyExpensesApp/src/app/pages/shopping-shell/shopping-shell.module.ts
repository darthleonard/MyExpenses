import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingShellPageRoutingModule } from './shopping-shell-routing.module';

import { ShoppingShellPage } from './shopping-shell.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ShoppingShellPageRoutingModule
  ],
  declarations: [ShoppingShellPage]
})
export class ShoppingShellPageModule {}
