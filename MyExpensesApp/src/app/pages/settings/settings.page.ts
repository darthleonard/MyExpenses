import { Component, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { InfoBoxComponent } from 'src/app/components/info-box/info-box.component';
import { CloudService } from 'src/app/services/cloud.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
})
export class SettingsPage {
  @ViewChild(InfoBoxComponent) infoBoxComponent: InfoBoxComponent;

  cloudEnabled = true;
  config = {
    method: 'https',
    url: 'localhost',
    port: 5001,
  };

  constructor(
    private toastController: ToastController,
    private storage: StorageService,
    public cloudService: CloudService
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

  onActionClick() {
    this.infoBoxComponent.setLoading(true);
    this.cloudService.setCloudEnabled(this.cloudEnabled);
    setTimeout(() => {this.infoBoxComponent?.setLoading(false)}, 2000);
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
