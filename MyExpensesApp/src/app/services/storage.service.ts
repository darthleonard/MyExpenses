import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private ionStorage: Storage) {
    this.init();
  }

  async init() {
    const storageInstance = await this.ionStorage.create();
    this.storage = storageInstance;
  }

  public set(key: string, value: any) {
    this.storage?.set(key, value);
  }

  public async get(key: string) {
    return await this.storage.get(key);
  }
}
