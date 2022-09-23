import { Injectable } from '@angular/core';
import { DataServiceBase } from './data.service';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataService extends DataServiceBase {
  
  constructor(public http: HttpClient, public toastController: ToastController) {
    super(http, toastController);
  }

  tableName = "products";
}
