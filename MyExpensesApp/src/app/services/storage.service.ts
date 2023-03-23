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
    if(this.storage) {
      return;
    }
    const storageInstance = await this.ionStorage.create();
    this.storage = storageInstance;
  }

  async set(key: string, value: any) {
    if(!this.storage) {
      await this.init();
    }
    return await this.storage.set(key, value);
  }

  async get(key: string) {
    if(!this.storage) {
      await this.init();
    }
    return await this.storage.get(key);
  }
}
