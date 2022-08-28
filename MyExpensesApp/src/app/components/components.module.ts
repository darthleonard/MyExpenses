import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuelItemComponent } from './fuel-item/fuel-item.component';
import { FormControlComponent } from './form/form-control.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { RouterModule } from '@angular/router';
import { SelectModalComponent } from './controls/select-modal/select-modal.component';
import { SearchFilterPipe } from './controls/select-modal/search-filter.pipe';

@NgModule({
  declarations: [
    FuelItemComponent,
    FormControlComponent,
    FormComponent,
    HeaderComponent,
    MainMenuComponent,
    SelectModalComponent,
    SearchFilterPipe
  ],
  exports:[
    FuelItemComponent,
    FormComponent,
    HeaderComponent,
    MainMenuComponent,
    SelectModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ComponentsModule { }