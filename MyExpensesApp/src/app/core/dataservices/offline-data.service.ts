import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from 'dexie';
import { database } from 'src/app/database/database';
import { CloudService } from 'src/app/services/cloud.service';

@Injectable({
  providedIn: 'root',
})
export class OfflineDataService {
  private _tableName: string;
  private table: Table;

  constructor(
    public readonly http: HttpClient,
    public readonly cloudService: CloudService
  ) {}

  get tableName() {
    return this._tableName;
  }

  set tableName(value: string) {
    if (value === this._tableName) {
      return;
    }
    this._tableName = value;
    this.table = this.getTable(this._tableName);
  }

  async getEntity(id: string) {
    return await this.table.get(id);
  }

  async getEntities() {
    return this.table.toArray();
  }

  async saveEntity(entity: any) {
    await this.table.put(entity);
  }

  async saveEntities(entities: any[]) {
    await this.table.bulkPut(entities);
  }

  async delete(id: any) {
    await this.table.delete(id);
  }

  // generic metods, may be deleted after creating dataServiceFactory
  getEntitiesFrom(tableName: string) {
    const table = this.getTable(tableName);
    if (!table) {
      throw { message: `table ${tableName} does not exist` };
    }
    return table.toArray();
  }

  async deleteFrom(tableName: string, id: any) {
    const table = this.getTable(tableName);
    await table.delete(id);
  }

  getTable(tableName: string) {
    const table = database.tables.find((t) => t.name === tableName);
    if (!table) {
      throw { message: `table ${tableName} does not exist` };
    }
    return table;
  }
}
