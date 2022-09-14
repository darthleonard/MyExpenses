import { Injectable } from '@angular/core';
import { DataServiceBase } from './data.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataService extends DataServiceBase {
  
  constructor(public toastController: ToastController) {
    super(toastController);
  }

  tableName = "products";
}
