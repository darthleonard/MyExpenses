import { Injectable } from '@angular/core';
import { database } from '../../database/database';
import { OnlineDataService } from './online-data.service';
import { CloudService } from 'src/app/services/cloud.service';
import { ActionType } from 'src/app/database/change-type';
import { OfflineDataService } from './offline-data.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(
    private readonly cloudService: CloudService,
    private readonly onlineDataService: OnlineDataService,
    private readonly offlineDataService: OfflineDataService
  ) {}

  async upload() {
    const unsynzedRecords = await this.offlineDataService.getEntitiesFrom("unsynchronizedRecords");
    const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
      arr.reduce((groups, item) => {
        (groups[key(item)] ||= []).push(item);
        return groups;
      }, {} as Record<K, T[]>);

    const grouped = groupBy(unsynzedRecords, (r) => r.table);
    const apiUrl = await this.cloudService.getApiUrl();

    for (const group in grouped) {
      console.log(`uploading ${group}`);
      const url = `${apiUrl}/${group}`;
      this.offlineDataService.tableName = group,

      // TODO: implement bulk action
      //const ids = grouped[group].map(g => g.recordId);
      //const records = await this.offlineDataService.getEntities(table, ids);

      grouped[group].forEach(async (record) => {
        const r = await this.offlineDataService.getEntity(record.recordId);
        switch (record.changeType) {
          case ActionType.insert:
          case ActionType.update:
            await this.onlineDataService.saveEntity(url, r).toPromise();
            break;
          case ActionType.delete:
            await this.onlineDataService.delete(url, r).toPromise();
            break;
        }
        this.offlineDataService.deleteFrom('unsynchronizedRecords', record.id);
      });
    }
  }
}
