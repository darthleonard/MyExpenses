import { Injectable } from '@angular/core';
import { OnlineDataService } from './online-data.service';
import { CloudService } from 'src/app/services/cloud.service';
import { ActionType } from 'src/app/database/change-type';
import { OfflineDataService } from './offline-data.service';
import { groupBy } from '../functions/lists-functions';

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

    const groupedObject = groupBy(unsynzedRecords, (r) => r.table);
    const apiUrl = await this.cloudService.getApiUrl();

    for (const groupName in groupedObject) {
      console.log(`uploading ${groupName}`);
      const url = `${apiUrl}/${groupName}`;
      this.offlineDataService.tableName = groupName,

      // TODO: implement bulk action
      //const ids = grouped[group].map(g => g.recordId);
      //const records = await this.offlineDataService.getEntities(table, ids);

      groupedObject[groupName].forEach(async (record) => {
        switch (record.changeType) {
          case ActionType.insert:
          case ActionType.update:
            const r = await this.offlineDataService.getEntity(record.recordId);
            await this.onlineDataService.saveEntity(url, r).toPromise();
            break;
          case ActionType.delete:
            await this.onlineDataService.delete(url, record.recordId).toPromise();
            this.offlineDataService.delete(record.recordId);
            break;
        }
        this.offlineDataService.deleteFrom('unsynchronizedRecords', record.id);
      });
    }
  }
}
