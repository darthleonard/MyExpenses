import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Shopping, ShoppingDetail } from 'src/app/database/database';
import DataUtils from 'src/app/utils/data-utils';
import { ShoppingProductModalPage } from './product-modal/shopping-product-modal.page';
import { DataServiceFactory } from 'src/app/database/data-service.factory';
import { DataService } from 'src/app/database/data-service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html'
})
export class ShoppingListPage implements OnInit {
  private dataService: DataService;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataServiceFactory: DataServiceFactory,
    private readonly modalController: ModalController
  ) {}

  shopping: Shopping;
  totalOnCar: number;
  totalExpected: number;

  ngOnInit() {
    this.dataService = this.dataServiceFactory.build('shoppings');
    this.route.params.subscribe(async (p) => {
      this.shopping = await this.dataService.getEntity(p['id']);
      if(!this.shopping.details) {
        this.shopping.details = [];
      }
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
      const detail = data?.data as ShoppingDetail;
      // TODO: hot fix until implementing boolean form control
      detail.onCar = selectedProduct.onCar;
      if (detail.id) {
        let p = this.shopping.details.find((p) => p.id === detail.id);
        let index = this.shopping.details.indexOf(p);
        this.shopping.details[index] = detail;
      } else {
        detail.id = DataUtils.createUUID();
        detail.shoppingId = this.shopping.id;
        this.shopping.details.push(detail);
      }
      this.updateTotal();
    });
    await modal.present();
  }

}