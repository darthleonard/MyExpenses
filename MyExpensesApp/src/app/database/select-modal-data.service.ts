import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CloudService } from '../services/cloud.service';
import { DataServiceBase } from './data.service';
import { OnlineDataService } from '../core/dataservices/online-data.service';
import { OfflineDataService } from '../core/dataservices/offline-data.service';

@Injectable()
export class SelectModalDataService extends DataServiceBase {
  constructor(
    public http: HttpClient,
    public toastController: ToastController,
    public cloudService: CloudService,
    public onlineDataService: OnlineDataService,
    public offlineDataService: OfflineDataService
  ) {
    super(http, toastController, cloudService, onlineDataService, offlineDataService);
  }

  tableName: string;
}
