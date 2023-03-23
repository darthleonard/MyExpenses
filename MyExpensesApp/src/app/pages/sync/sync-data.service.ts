import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DataServiceBase } from 'src/app/database/data.service';
import { CloudService } from 'src/app/services/cloud.service';

@Injectable({
  providedIn: 'root',
})
export class SyncDataService extends DataServiceBase {
  constructor(
    public http: HttpClient,
    public toastController: ToastController,
    public cloudService: CloudService
  ) {
    super(http, toastController, cloudService);
  }

  tableName = 'unsynchronizedRecords';
}
