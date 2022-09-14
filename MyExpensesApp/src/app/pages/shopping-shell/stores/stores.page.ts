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
    await this.openProductModal();
  }

  async onEditClick(product: Store) {
    await this.openProductModal(product);
  }

  onDeleteClick(product: Store) {
    this.stores = this.stores.filter((i) => i.id !== product.id);
    this.dataService.delete(product);
  }

  private async openProductModal(product?: any) {
    const modal = await this.modalController.create({
      component: StoreModalPage,
      componentProps: {
        product: product,
      },
      backdropDismiss: false
    });
    modal.onDidDismiss().then(async (productData) => {
      if (productData.role === 'cancel') {
        return;
      }

      if (product?.id) {
        product.name = productData.data.name;
        product.effectiveDate = productData.data.effectiveDate;
        product = await this.dataService.saveEntity(product);
      } else {
        product = await this.dataService.saveEntity(productData.data);
        this.stores.push(product);
      }
    });
    await modal.present();
  }

}
