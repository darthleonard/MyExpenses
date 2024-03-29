import { Injectable } from '@angular/core';
import { DataServiceBase } from './data.service';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CloudService } from '../services/cloud.service';
import { OnlineDataService } from '../core/dataservices/online-data.service';
import { OfflineDataService } from '../core/dataservices/offline-data.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingDataService extends DataServiceBase {
  constructor(
    public http: HttpClient,
    public toastController: ToastController,
    public cloudService: CloudService,
    public onlineDataService: OnlineDataService,
    public offlineDataService: OfflineDataService
  ) {
    super(http, toastController, cloudService, onlineDataService, offlineDataService);
  }

  tableName = 'shoppings';

  onCreateEntity(entity: any) {
    entity.details = [];
    entity.total = 0;
  }

  beforeSave(entity: any) {
    entity.total = 0;
    entity.details
      .filter((p) => p.onCar)
      .forEach((p) => (entity.total += p.totalAmount));
  }
}
