import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingPageRoutingModule } from './shopping-routing.module';

import { ShoppingPage } from './shopping.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ShoppingListtModalPage } from './shopping-list-modal/shopping-list-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ShoppingPage, ShoppingListtModalPage]
})
export class ShoppingPageModule {}
