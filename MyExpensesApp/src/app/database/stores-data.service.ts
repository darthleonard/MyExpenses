import { Injectable } from '@angular/core';
import { DataServiceBase } from './data.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class StoresDataService extends DataServiceBase {
  
  constructor(public toastController: ToastController) {
    super(toastController);
  }

  tableName = "stores";
}
