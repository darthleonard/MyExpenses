import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CloudService } from 'src/app/services/cloud.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
})
export class SettingsPage {
  cloudEnabled = true;
  config = {
    method: 'https',
    url: 'localhost',
    port: 5001,
  };

  constructor(
    private toastController: ToastController,
    private storage: StorageService,
    private cloudService: CloudService
  ) {
    this.load();
  }

  async onSave() {
    await this.storage.set('cloudEnabled', this.cloudEnabled);
    await this.storage.set('config', JSON.stringify(this.config));
    this.cloudService.setCloudEnabled(this.cloudEnabled);
    const toast = await this.toastController.create({
      message: 'Saved',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  private async load() {
    const cloudSuscription = this.cloudService.cloudEnabled$.subscribe(
      (r) => (this.cloudEnabled = r)
    );
    this.cloudEnabled = await this.storage.get('cloudEnabled');
    const savedSettings = await this.storage.get('config');
    if (savedSettings) {
      this.config = JSON.parse(await this.storage.get('config'));
    } else {
      await this.onSave();
    }
    cloudSuscription.unsubscribe();
  }
}
