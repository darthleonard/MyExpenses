import { DataServiceArgs } from './data-service.args';
import { ActionType } from './change-type';
import DataUtils from '../utils/data-utils';

export class DataService {
  constructor(private readonly args: DataServiceArgs) {
    this.args.offlineDataService.tableName = this.args.endpoint;
  }

  async getEntities() {
    return await this.args.offlineDataService.getEntities();
  }

  async getEntity(id: string) {
    return await this.args.offlineDataService.getEntity(id);
  }

  async saveEntity(entity: any) {
    let action = ActionType.update;
    if (!entity.hasOwnProperty('id') || !entity.id) {
      action = ActionType.insert;
      entity.id = DataUtils.createUUID();
      entity.creationDate = new Date();
    }

    entity.lastModDate = new Date();

    if (this.args.cloudService.online) {
      const apiUrl = await this.args.cloudService.getApiUrl();
      const url = `${apiUrl}/${this.args.endpoint}`;
      try {
        await this.args.onlineDataService.saveEntity(url, entity).toPromise();
        await this.args.offlineDataService.saveEntity(entity);
        return entity;
      } catch (error) {
        // build a structure for medium logging error info
        throw { title: 'Save Error', error: error };
      }
    }

    await this.args.offlineDataService.saveEntity(entity);
    await this.notSynchronized(entity.id, this.args.endpoint, action);
    return entity;
  }

  async delete(entityId: string) {
    await this.args.offlineDataService.delete(entityId);
    if (this.args.cloudService.online) {
      const url = `${await this.args.cloudService.getApiUrl()}/${this.args.endpoint}`;
      this.args.onlineDataService.delete(url, entityId).subscribe({
        error: (e) => {
          this.notSynchronized(entityId, this.args.endpoint, ActionType.delete);
          console.log('¡error! \n', e);
        }
      });
      return;
    }
    
    this.notSynchronized(entityId, this.args.endpoint, ActionType.delete);
  }

  private async notSynchronized(
    recordId: string,
    tableName: string,
    change: ActionType
  ) {
    const unsynchronizedRecordsTable = this.args.offlineDataService.getTable('unsynchronizedRecords');
    const record = await unsynchronizedRecordsTable
      .where({ table: tableName, recordId: recordId })
      .first();
    if (!record) {
      unsynchronizedRecordsTable.add({
        recordId: recordId,
        table: tableName,
        changeType: change,
      });
      return;
    }
    switch (change) {
      case ActionType.delete:
        unsynchronizedRecordsTable.delete(record.id);
        break;
      case ActionType.update:
        unsynchronizedRecordsTable.update(record.id, { changeType: change });
        break;
      case ActionType.insert:
        throw `duplicated recor\n table: ${tableName} - recordId: ${recordId}`;
    }
  }
}
