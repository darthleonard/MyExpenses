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
import { DateControlComponent } from './controls/date-control/date-control.component';
import { ModalComponent } from './modal-form/modal.component';
import { ModalFormComponent } from './modal-form/modal-form.component';

@NgModule({
  declarations: [
    FuelItemComponent,
    FormControlComponent,
    FormComponent,
    HeaderComponent,
    MainMenuComponent,
    SelectModalComponent,
    DateControlComponent,
    ModalComponent,
    ModalFormComponent,
    SearchFilterPipe
  ],
  exports:[
    FuelItemComponent,
    FormComponent,
    HeaderComponent,
    MainMenuComponent,
    SelectModalComponent,
    DateControlComponent,
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ComponentsModule { }