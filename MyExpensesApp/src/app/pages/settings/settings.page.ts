import { Component } from '@angular/core';
import { CloudService } from 'src/app/services/cloud.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html'
})
export class SettingsPage {
  cloudEnabled = true;
  config = {
    method: "https",
    url: "localhost",
    port: 5001
  }

  constructor(private storage: StorageService, private connectivityService: CloudService) {
    this.load();
  }

  async onSave() {
    await this.storage.set('cloudEnabled', this.cloudEnabled);
    await this.storage.set('config', JSON.stringify(this.config));
    this.connectivityService.setCloudEnabled(this.cloudEnabled);
  }

  private async load() {
    this.cloudEnabled = await this.storage.get('cloudEnabled');
    const savedSettings = await this.storage.get('config');
    if(savedSettings) {
      this.config = JSON.parse(await this.storage.get('config'));
    } else {
      await this.onSave();
    }
  }
}
