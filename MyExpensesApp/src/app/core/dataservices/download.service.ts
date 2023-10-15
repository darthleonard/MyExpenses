import { Injectable } from '@angular/core';
import { OnlineDataService } from './online-data.service';
import { CloudService } from 'src/app/services/cloud.service';
import { OfflineDataService } from './offline-data.service';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(
    private readonly cloudService: CloudService,
    private readonly onlineDataService: OnlineDataService,
    private readonly offlineDataService: OfflineDataService
  ) {}

  async download(tableNames: string[]) {
    for (const tableName of tableNames) {
      console.log(`downloading ${tableName}`);
      this.offlineDataService.tableName = tableName;
      const url = `${await this.cloudService.getApiUrl()}/${tableName}`;
      const entities = await this.onlineDataService
        .getEntities(url)
        .toPromise();
      console.log(`downloaded ${entities.length} records from ${tableName}`);
      if(entities.length == 0) {
        continue;
      }
      this.offlineDataService.saveEntities(entities);
    }
  }
}
