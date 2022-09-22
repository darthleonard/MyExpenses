import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from 'src/app/database/database';
import { StoresDataService } from 'src/app/database/stores-data.service';
import { StoreModalPage } from './store-modal.page';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html'
})
export class StoresPage {

  constructor(
    private readonly dataService: StoresDataService,
    private readonly modalController: ModalController
  ) {}

  stores: Store[] = [];

  ionViewWillEnter() {
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
    this.dataService.delete(store);
  }

  private async openStoreModal(store?: any) {
    const modal = await this.modalController.create({
      component: StoreModalPage,
      componentProps: {
        product: store,
      },
      backdropDismiss: false
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
