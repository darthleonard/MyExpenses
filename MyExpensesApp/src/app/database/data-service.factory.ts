import { HttpClient } from '@angular/common/http';
import { CloudService } from '../services/cloud.service';
import { OnlineDataService } from '../core/dataservices/online-data.service';
import { OfflineDataService } from '../core/dataservices/offline-data.service';
import { DataService } from './data-service';
import { DataServiceArgs } from './data-service.args';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class DataServiceFactory {
  constructor(
    private readonly http: HttpClient,
    private readonly cloudService: CloudService,
    private readonly onlineDataService: OnlineDataService,
    private readonly offlineDataService: OfflineDataService
  ) {}

  build(endpoint: string) {
    this.configureOfflineService(endpoint);
    const args = {
      http: this.http,
      cloudService: this.cloudService,
      onlineDataService: this.onlineDataService,
      offlineDataService: this.offlineDataService,
      endpoint: endpoint,
    } as DataServiceArgs;
    return new DataService(args);
  }

  private configureOfflineService(endpoint: string) {
    this.offlineDataService.tableName = endpoint;
  }
}
