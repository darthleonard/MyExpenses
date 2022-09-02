import { ToastController } from '@ionic/angular';
import { database } from './database';

export abstract class DataServiceBase {
  constructor(public toastController: ToastController) {}

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
    const table = this.getTable();
    if (!entity.hasOwnProperty('id') || !entity.id) {
      entity.creationDate = new Date();
      this.onCreateEntity(entity);
    }

    entity.lastModDate = new Date();
    this.beforeSave(entity);
    entity.id = await table.put(entity);
    await this.showToast(`${this.tableName} saved`);
    return entity;
  }

  async delete(entity: any) {
    const table = this.getTable();
    table.delete(entity).then((r) => console.log(r));
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
      })
    ).present();
  }
}
