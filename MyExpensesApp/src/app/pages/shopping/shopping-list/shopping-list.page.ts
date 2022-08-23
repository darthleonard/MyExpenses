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
      this.shopping = await this.dataService.getShoppingList(Number(p['id']));
      this.updateTotal();
    });
  }

  onAddClick() {
    this.openProductModal({quantity: 1});
  }

  onEditClick(product: any) {
    this.openProductModal(product);
  }

  onDeleteClick(product: any) {
    this.shopping.products = this.shopping.products.filter(
      (p) => p.id !== product.id
    );
  }

  onSaveList() {
    this.dataService.saveShoppingLists(this.shopping);
  }

  updateTotal() {
    this.totalOnCar = 0;
    this.totalExpected = 0;
    this.shopping.products
      .filter((p) => p.onCar)
      .forEach((p) => (this.totalOnCar += p.totalAmount));
    this.shopping.products.forEach(
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
      const product = data?.data;
      // TODO: hot fix until implementing boolean form control
      product.onCar = selectedProduct.onCar;
      if (product.id) {
        let p = this.shopping.products.find((p) => p.id === product.id);
        let index = this.shopping.products.indexOf(p);
        this.shopping.products[index] = product;
      } else {
        product.id = DataUtils.createUUID();
        this.shopping.products.push(product);
      }
      this.updateTotal();
    });
    await modal.present();
  }
}
