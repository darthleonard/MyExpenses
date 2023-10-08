import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from 'dexie';
import { CloudService } from 'src/app/services/cloud.service';

@Injectable({
  providedIn: 'root',
})
export class OfflineDataService {
  constructor(
    public http: HttpClient,
    public cloudService: CloudService
  ) {}

  async saveEntity(table: Table, entity: any) {
    await table.put(entity);
  }

  async delete(table: Table, entity: any) {
    await table.delete(entity.id);
  }
}
