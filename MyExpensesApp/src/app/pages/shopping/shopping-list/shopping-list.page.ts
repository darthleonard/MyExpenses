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
  templateUrl: './shopping-list.page.html'
})
export class ShoppingListPage implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataService: ShoppingDataService,
    private readonly modalController: ModalController
  ) {}

  shopping: Shopping;

  ngOnInit() {
    this.route.params.subscribe(async (p) => {
      this.shopping = await this.dataService.getShoppingList(Number(p['id']));
      if (!this.shopping.products) this.shopping.products = [];
    });
  }

  onAddClick() {
    this.openProductModal({});
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
      const product = data?.data;
      // TODO: hot fix until implementing boolean form control
      product.onCar = selectedProduct.onCar;
      if (product) {
        if(product.id) {
          let p = this.shopping.products.find(p => p.id === product.id);
          let index = this.shopping.products.indexOf(p);
          this.shopping.products[index] = product;
        } else {
          product.id = DataUtils.createUUID();
          this.shopping.products.push(product);
        }
      }
    });
    await modal.present();
  }
}
