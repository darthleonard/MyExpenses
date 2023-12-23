import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from 'src/app/database/database';
import { StoreModalPage } from './store-modal.page';
import { DataServiceFactory } from 'src/app/database/data-service.factory';
import { DataService } from 'src/app/database/data-service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
})
export class StoresPage {
  private dataService: DataService;

  constructor(
    private readonly dataServiceFactory: DataServiceFactory,
    private readonly modalController: ModalController
  ) {}

  stores: Store[] = [];

  ionViewWillEnter() {
    this.dataService = this.dataServiceFactory.build('stores');
    this.dataService.getEntities().then((e) => (this.stores = e));
  }

  async onAddClick() {
    await this.openStoreModal();
  }

  async onEditClick(store: Store) {
    await this.openStoreModal(store);
  }

  onDeleteClick(store: Store) {
    this.stores = this.stores.filter((i) => i.id !== store.id);
    this.dataService.delete(store.id);
  }

  private async openStoreModal(store?: any) {
    const modal = await this.modalController.create({
      component: StoreModalPage,
      componentProps: {
        store: store,
      },
      backdropDismiss: false,
    });
    modal.onDidDismiss().then(async (storeData) => {
      if (storeData.role === 'cancel') {
        return;
      }

      if (store?.id) {
        store.name = storeData.data.name;
        store = await this.dataService.saveEntity(store);
      } else {
        store = await this.dataService.saveEntity(storeData.data);
        this.stores.push(store);
      }
    });
    await modal.present();
  }
}
