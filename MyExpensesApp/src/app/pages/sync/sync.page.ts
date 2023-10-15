import { Component } from '@angular/core';
import { SyncDataService } from './sync-data.service';
import { DownloadService } from 'src/app/core/dataservices/download.service';
import { StorageService } from 'src/app/services/storage.service';
import { ActionType } from 'src/app/database/change-type';
import { uncynsedRecord } from './unsynced-record';
import { UploadService } from 'src/app/core/dataservices/upload.service';
import { groupBy } from 'src/app/core/functions/lists-functions';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage {
  constructor(
    private readonly storage: StorageService,
    private readonly syncDataService: SyncDataService,
    private readonly downloadService: DownloadService,
    private readonly uploadService: UploadService
  ) {}

  lastSyncDate: Date;
  unsyncedRecords: uncynsedRecord[];

  async ionViewWillEnter() {
    this.lastSyncDate = await this.storage.get('lastSyncDate');
    this.syncDataService.getEntities().then((r) => this.loadList(r));
  }

  loadList(records: any[]) {
    this.unsyncedRecords = [];
    const grouped = groupBy(records, r => r.table);

    for(const group in grouped) {
      this.unsyncedRecords.push({
        table: `${group}`,
        news: grouped[group].filter(r => r.changeType === ActionType.insert).length ?? 0,
        updated: grouped[group].filter(r => r.changeType === ActionType.update).length ?? 0,
        deleted: grouped[group].filter(r => r.changeType === ActionType.delete).length ?? 0,
        records: grouped[group]
       });
    }
  }

  async onSync() {
    await this.uploadService.upload();

    this.downloadService
      .download(['products', 'stores', 'shoppings'])
      .then(() => {
        this.lastSyncDate = new Date();
        this.storage.set('lastSyncDate', this.lastSyncDate);
      });
  }
}
