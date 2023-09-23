import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Shopping } from 'src/app/database/database';
import { ShoppingDataService } from 'src/app/database/shopping-data.service';
import DataUtils from 'src/app/utils/data-utils';
import { ShoppingProductModalPage } from './product-modal/shopping-product-modal.page';

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
  totalOnCar: number;
  totalExpected: number;

  ngOnInit() {
    this.route.params.subscribe(async (p) => {
      this.shopping = await this.dataService.getEntity(p['id']);
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
    this.shopping.details = this.shopping.details.filter(
      (p) => p.id !== product.id
    );
  }

  onSaveList() {
    this.dataService.saveEntity(this.shopping);
  }

  updateTotal() {
    this.totalOnCar = 0;
    this.totalExpected = 0;
    this.shopping.details
      .filter((p) => p.onCar)
      .forEach((p) => (this.totalOnCar += p.totalAmount));
    this.shopping.details.forEach(
      (p) => (this.totalExpected += p.totalAmount)
    );
  }

  private async openProductModal(selectedProduct: any) {
    const modal = await this.modalController.create({
      component: ShoppingProductModalPage,
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
        let p = this.shopping.details.find((p) => p.id === productDetail.id);
        let index = this.shopping.details.indexOf(p);
        this.shopping.details[index] = productDetail;
      } else {
        productDetail.id = DataUtils.createUUID();
        this.shopping.details.push(productDetail);
      }
      this.updateTotal();
    });
    await modal.present();
  }

}
