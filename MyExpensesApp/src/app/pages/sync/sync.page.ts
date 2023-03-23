import { Component, OnInit } from '@angular/core';
import { SyncDataService } from './sync-data.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements OnInit {
  unsyncedRecords: {
    table: string,
    count: number,
    records: any[]
  }[];

  constructor(private syncDataService: SyncDataService) { }

  ngOnInit() {
    this.syncDataService.getEntities().then(r => this.some(r));
  }

  some(records: any[]) {
    this.unsyncedRecords = [];
    
     const grouped = this.groupBy(records, 'table');
     
     this.unsyncedRecords.push({
      table: 'products',
      count: grouped.products.length,
      records: grouped.products
     });
    
     this.unsyncedRecords.push({
      table: 'stores',
      count: grouped.stores.length,
      records: grouped.stores
     });
  }

  onSync() {
    
  }

  private groupBy(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

}
