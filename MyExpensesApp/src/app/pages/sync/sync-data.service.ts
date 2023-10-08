import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DataServiceBase } from 'src/app/database/data.service';
import { CloudService } from 'src/app/services/cloud.service';
import { OnlineDataService } from 'src/app/core/dataservices/online-data.service';
import { OfflineDataService } from 'src/app/core/dataservices/offline-data.service';

@Injectable({
  providedIn: 'root',
})
export class SyncDataService extends DataServiceBase {
  constructor(
    public http: HttpClient,
    public toastController: ToastController,
    public cloudService: CloudService,
    public onlineDataService: OnlineDataService,
    public offlineDataService: OfflineDataService
  ) {
    super(http, toastController, cloudService, onlineDataService, offlineDataService);
  }

  tableName = 'unsynchronizedRecords';
}
