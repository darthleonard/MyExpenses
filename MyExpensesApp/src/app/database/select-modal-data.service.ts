import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataServiceBase } from './data.service';

@Injectable()
export class SelectModalDataService extends DataServiceBase {
  constructor(public toastController: ToastController) {
    super(toastController);
  }

  tableName: string;
}
