import { Component, OnInit } from '@angular/core';
import { SyncDataService } from './sync-data.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements OnInit {
  unsyncedRecords: any[];

  constructor(private syncDataService: SyncDataService) { }

  ngOnInit() {
    this.syncDataService.getEntities().then(r => this.some(r));
  }

  some(records: any[]) {
    this.unsyncedRecords = records
  }

  onSync() {

  }

}
