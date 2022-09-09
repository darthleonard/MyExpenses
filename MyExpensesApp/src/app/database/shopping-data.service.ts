import { Injectable } from '@angular/core';
import { DataServiceBase } from './data.service';
import { liveQuery } from 'dexie';
import { database, Shopping } from './database';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ShoppingDataService extends DataServiceBase {
  
  constructor(public toastController: ToastController) {
    super(toastController);
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
