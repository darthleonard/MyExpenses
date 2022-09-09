import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Shopping } from 'src/app/database/database';
import { ShoppingDataService } from 'src/app/database/shopping-data.service';
import DataUtils from 'src/app/utils/data-utils';
import { Product } from '../shopping';
import { ProductModalPage } from './product-modal/product-modal.page';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
})
export class ShoppingListPage implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataService: ShoppingDataService,
    private readonly modalController: ModalController
  ) {}

  shopping: Shopping;
  totalOnCar: number;
  totalExpected: number;

  ngOnInit() {
    this.route.params.subscribe(async (p) => {
      this.shopping = await this.dataService.getEntity(Number(p['id']));
      this.updateTotal();
    });
  }

  onAddClick() {
    this.openProductModal({});
  }

  onEditClick(product: any) {
    this.openProductModal(product);
  }

  onDeleteClick(product: any) {
    this.shopping.productsDetail = this.shopping.productsDetail.filter(
      (p) => p.id !== product.id
    );
  }

  onSaveList() {
    this.dataService.saveEntity(this.shopping);
  }

  updateTotal() {
    this.totalOnCar = 0;
    this.totalExpected = 0;
    this.shopping.productsDetail
      .filter((p) => p.onCar)
      .forEach((p) => (this.totalOnCar += p.totalAmount));
    this.shopping.productsDetail.forEach(
      (p) => (this.totalExpected += p.totalAmount)
    );
  }

  private async openProductModal(selectedProduct: any) {
    const modal = await this.modalController.create({
      component: ProductModalPage,
      componentProps: {
        product: selectedProduct,
      },
      backdropDismiss: false,
      cssClass: 'half-modal',
    });
    modal.onDidDismiss().then(async (data) => {
      if (!data?.data) {
        return;
      }
      const productDetail = data?.data;
      // TODO: hot fix until implementing boolean form control
      productDetail.onCar = selectedProduct.onCar;
      if (productDetail.id) {
        let p = this.shopping.productsDetail.find((p) => p.id === productDetail.id);
        let index = this.shopping.productsDetail.indexOf(p);
        this.shopping.productsDetail[index] = productDetail;
      } else {
        this.shopping.productsDetail.push(productDetail);
      }
      this.updateTotal();
    });
    await modal.present();
  }
}
