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
  styleUrls: ['./shopping-list.page.scss'],
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
    this.openProductModal();
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

  private async openProductModal(product?: any) {
    const modal = await this.modalController.create({
      component: ProductModalPage,
      componentProps: {
        product: product,
      },
      backdropDismiss: false,
      cssClass: 'half-modal',
    });
    modal.onDidDismiss().then(async (data) => {
      const paramsFilter = data?.data;
      if (paramsFilter) {
        paramsFilter.amount = Number(paramsFilter.unitPrice) * Number(paramsFilter.quantity);
        if(paramsFilter.id) {
          let p = this.shopping.products.find(p => p.id === paramsFilter.id);
          let index = this.shopping.products.indexOf(p);
          this.shopping.products[index] = paramsFilter;
        } else {
          paramsFilter.id = DataUtils.createUUID();
          this.shopping.products.push(paramsFilter);
        }
      }
    });
    await modal.present();
  }
}
