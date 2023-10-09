import { Component, OnInit } from '@angular/core';
import { SyncDataService } from './sync-data.service';
import { DownloadService } from 'src/app/core/dataservices/download.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements OnInit {
  unsyncedRecords: {
    table: string;
    count: number;
    records: any[];
  }[];

  constructor(
    private storage: StorageService,
    private syncDataService: SyncDataService,
    private downloadService: DownloadService
  ) {}

  lastSyncDate: Date;

  ngOnInit() {
    this.syncDataService.getEntities().then((r) => this.some(r));
  }

  async ionViewWillEnter() {
    this.lastSyncDate = await this.storage.get('lastSyncDate');
  }

  some(records: any[]) {
    this.unsyncedRecords = [];

    //  const grouped = this.groupBy(records, 'table');

    //  this.unsyncedRecords.push({
    //   table: 'products',
    //   count: grouped.products.length,
    //   records: grouped.products
    //  });

    //  this.unsyncedRecords.push({
    //   table: 'stores',
    //   count: grouped.stores.length,
    //   records: grouped.stores
    //  });
  }

  async onSync() {
    this.downloadService
      .download(['products', 'stores', 'shoppings'])
      .then(() => {
        this.lastSyncDate = new Date();
        this.storage.set('lastSyncDate', this.lastSyncDate);
      });
  }

  private groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
}
