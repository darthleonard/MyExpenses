import { Injectable } from '@angular/core';
import { DataServiceBase } from './data.service';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CloudService } from '../services/cloud.service';

@Injectable({
  providedIn: 'root',
})
export class StoresDataService extends DataServiceBase {
  constructor(
    public http: HttpClient,
    public toastController: ToastController,
    public cloudService: CloudService
  ) {
    super(http, toastController, cloudService);
  }

  tableName = 'stores';
}
