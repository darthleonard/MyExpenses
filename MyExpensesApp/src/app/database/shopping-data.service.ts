import { Injectable } from '@angular/core';
import { DataServiceBase } from './data.service';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShoppingDataService extends DataServiceBase {
  
  constructor(public http: HttpClient, public toastController: ToastController) {
    super(http, toastController);
  }

  tableName = "shoppingLists";

  onCreateEntity(entity: any) {
    entity.productsDetail = [];
    entity.total = 0;
  }

  beforeSave(entity: any) {
    entity.total = 0;
    entity.productsDetail.filter(p => p.onCar).forEach(p => entity.total += p.totalAmount);
  }
}
