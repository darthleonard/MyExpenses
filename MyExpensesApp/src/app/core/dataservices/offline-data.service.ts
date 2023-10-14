import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from 'dexie';
import { CloudService } from 'src/app/services/cloud.service';

@Injectable({
  providedIn: 'root',
})
export class OfflineDataService {
  constructor(
    public readonly http: HttpClient,
    public readonly cloudService: CloudService
  ) {}

  async getEntity(table: Table, id: string) {
    return await table.get(id);
  }

  async getEntities(table: Table, ids: string[]) {
    await table.bulkGet(ids);
  }

  async saveEntity(table: Table, entity: any) {
    await table.put(entity);
  }

  async delete(table: Table, id: any) {
    await table.delete(id);
  }
}
