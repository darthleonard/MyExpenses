import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html'
})
export class SettingsPage {
  config = {
    method: "https",
    url: "localhost",
    port: 5001
  }

  constructor(private storage: StorageService) {
    
    this.load();
  }

  async onSave() {
    await this.storage.set('config', JSON.stringify(this.config));
  }

  private async load() {
    const savedSettings = await this.storage.get('config');
    if(savedSettings) {
      this.config = JSON.parse(await this.storage.get('config'));
    } else {
      await this.onSave();
    }
  }
}
