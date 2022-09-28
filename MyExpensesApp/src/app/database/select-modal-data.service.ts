import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataServiceBase } from './data.service';

@Injectable()
export class SelectModalDataService extends DataServiceBase {
  
  constructor(public http: HttpClient, public toastController: ToastController) {
    super(http, toastController);
  }

  tableName: string;
}
