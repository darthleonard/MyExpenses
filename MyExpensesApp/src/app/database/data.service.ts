import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { CloudService } from '../services/cloud.service';
import { ActionType } from './change-type';
import { database } from './database';
import DataUtils from '../utils/data-utils';
import { OnlineDataService } from '../core/dataservices/online-data.service';
import { OfflineDataService } from '../core/dataservices/offline-data.service';

export abstract class DataServiceBase {
  constructor(
    public http: HttpClient,
    public toastController: ToastController,
    public cloudService: CloudService,
    public onlineDataService: OnlineDataService,
    public offlineDataService: OfflineDataService
  ) {}

  abstract tableName: string;

  getEntities() {
    const table = this.getTable();
    return table.toArray();
  }

  async getEntity(id: string) {
    const table = this.getTable();
    return await table.get(id);
  }

  async saveEntity(entity: any) {
    let action = ActionType.update;
    const table = this.getTable();
    if (!entity.hasOwnProperty('id') || !entity.id) {
      action = ActionType.insert;
      entity.id = DataUtils.createUUID();
      entity.creationDate = new Date();
      this.onCreateEntity(entity);
    }

    entity.lastModDate = new Date();
    this.beforeSave(entity);

    if (this.cloudService.online) {
      const apiUrl = await this.cloudService.getApiUrl();
      const url = `${apiUrl}/${table.name}`;
      try {
        await this.onlineDataService.saveEntity(url, entity).toPromise();
        await this.offlineDataService.saveEntity(table, entity);
        return entity;
      } catch (error) {
        // build a structure for medium logging error info
        throw { title: 'Save Error', error: error };
      }
    } else {
      await this.offlineDataService.saveEntity(table, entity);
      await this.notSynchronized(entity.id, table.name, action);
      return entity;
    }
  }

  async delete(entity: any) {
    const table = this.getTable();
    await table.delete(entity.id);

    if (this.cloudService.online) {
      const apiUrl = await this.cloudService.getApiUrl();
      this.http.delete(`${apiUrl}/${table.name}/${entity.id}`).subscribe({
        error: (e) =>
          e.status === 0
            ? this.notSynchronized(entity.id, table.name, ActionType.delete)
            : this.handleError(e),
      });
    } else {
      this.notSynchronized(entity.id, table.name, ActionType.delete);
    }

    await this.showToast(`${this.tableName} deleted`);
  }

  onCreateEntity(entity: any) {}

  beforeSave(entity: any) {}

  // TODO: there should be a better way to validate if table exists
  private getTable() {
    const table = database.tables.find((t) => t.name === this.tableName);
    if (!table) {
      throw { message: `table ${this.tableName} does not exist` };
    }
    return table;
  }

  private async showToast(message: string, color = 'success') {
    (
      await this.toastController.create({
        message: message,
        duration: 2000,
        color: color,
      })
    ).present();
  }

  private async notSynchronized(
    id: string,
    tableName: string,
    change: ActionType
  ) {
    const unsynchronizedRecords = database.tables.find(
      (t) => t.name === 'unsynchronizedRecords'
    );
    const record = await unsynchronizedRecords
      .where({ table: tableName, recordId: id })
      .first();
    if (!record) {
      unsynchronizedRecords.add({
        recordId: id,
        table: tableName,
        changeType: change,
      });
      return;
    }
    switch (change) {
      case ActionType.delete:
        unsynchronizedRecords.delete(record.id);
        break;
      case ActionType.update:
        unsynchronizedRecords.update(record.id, { changeType: change });
        break;
      case ActionType.insert:
        throw `duplicated recor\n table: ${tableName} - recordId: ${id}`;
    }
  }

  private handleError(error) {
    this.showToast(`Error ${error.status}`, 'danger');
    console.log('error handled\n', error);
  }
}
