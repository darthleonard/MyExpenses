import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/database/database';
import { ProductsDataService } from 'src/app/database/products-data.service';
import { ProductModalPage } from './product-modal.page';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
})
export class ProductsPage {
  constructor(
    private readonly dataService: ProductsDataService,
    private readonly modalController: ModalController
  ) {}

  products: Product[] = [];

  ionViewWillEnter() {
    this.dataService.getEntities().then((e) => (this.products = e));
  }

  async onAddClick() {
    await this.openProductModal();
  }

  async onEditClick(product: Product) {
    await this.openProductModal(product);
  }

  onDeleteClick(product: Product) {
    this.products = this.products.filter((i) => i.id !== product.id);
    this.dataService.delete(product);
  }

  private async openProductModal(product?: any) {
    const modal = await this.modalController.create({
      component: ProductModalPage,
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
        this.products.push(product);
      }
    });
    await modal.present();
  }
}
