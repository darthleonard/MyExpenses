import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CloudService } from '../services/cloud.service';
import { DataServiceBase } from './data.service';

@Injectable()
export class SelectModalDataService extends DataServiceBase {
  constructor(
    public http: HttpClient,
    public toastController: ToastController,
    public cloudService: CloudService
  ) {
    super(http, toastController, cloudService);
  }

  tableName: string;
}
