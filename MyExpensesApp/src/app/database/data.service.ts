import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ActionType } from './change-type';
import { database } from './database';

export abstract class DataServiceBase {
  private apiUrl = 'https://localhost:5001/api/';

  constructor(
    public http: HttpClient,
    public toastController: ToastController
  ) {}

  abstract tableName: string;

  getEntities() {
    const table = this.getTable();
    return table.toArray();
  }

  async getEntity(id: number) {
    const table = this.getTable();
    return await table.get(id);
  }

  async saveEntity(entity: any) {
    let action = ActionType.update;
    const table = this.getTable();
    if (!entity.hasOwnProperty('id') || !entity.id) {
      action = ActionType.insert;
      entity.id = undefined;
      entity.creationDate = new Date();
      this.onCreateEntity(entity);
    }

    entity.lastModDate = new Date();
    this.beforeSave(entity);
    entity.id = await table.put(entity);

    this.http.post(`${this.apiUrl}${table.name}`, entity).subscribe({
      error: (e) =>
        e.status === 0
          ? this.notSynchronized(entity.id, table.name, action)
          : this.handleError(e),
    });

    await this.showToast(`${this.tableName} saved`);
    return entity;
  }

  async delete(entity: any) {
    const table = this.getTable();
    await table.delete(entity.id);

    this.http.delete(`${this.apiUrl}${table.name}/${entity.id}`).subscribe({
      error: (e) =>
        e.status === 0
          ? this.notSynchronized(entity.id, table.name, ActionType.delete)
          : this.handleError(e),
    });

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

  private async showToast(message: string) {
    (
      await this.toastController.create({
        message: message,
        duration: 2000,
        color: 'success',
      })
    ).present();
  }

  private notSynchronized(id: number, tableName: string, change: ActionType) {
    database.table('unsynchronizedRecords').add({
      id: id,
      table: tableName,
      changeType: change,
    });
  }

  private handleError(error) {
    console.log('error handled');
    console.log(error);
  }
}
