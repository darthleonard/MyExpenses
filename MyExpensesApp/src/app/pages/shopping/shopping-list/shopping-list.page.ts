import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Shopping } from 'src/app/database/database';
import { ShoppingDataService } from 'src/app/database/shopping-data.service';
import { Product } from '../shopping';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataService: ShoppingDataService,
    private readonly alertController: AlertController
  ) {}

  shopping: Shopping;

  ngOnInit() {
    this.route.params.subscribe(async (p) => {
      this.shopping = await this.dataService.getShoppingList(Number(p['id']));
      if (!this.shopping.products) this.shopping.products = [];
    });
  }

  onAddClick() {
    this.presentAlert();
  }

  onEditClick(product: any) {
    this.presentAlert(product);
  }

  onDeleteClick(product: any) {
    this.shopping.products = this.shopping.products.filter(
      (p) => p.id !== product.id
    );
  }

  onSaveList() {
    this.dataService.saveShoppingLists(this.shopping);
  }

  private async presentAlert(product?: any) {
    const title = product ? 'Edit' : 'New';
    const alert = await this.alertController.create({
      header: `${title} Product`,
      backdropDismiss: false,
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: product?.name,
        },
        {
          name: 'brand',
          placeholder: 'Brand',
          value: product?.brand,
        },
        {
          name: 'store',
          placeholder: 'Store',
          value: product?.store,
        },
        {
          name: 'unitPrice',
          placeholder: 'Price',
          value: product?.unitPrice,
          type: 'number',
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: product?.quantity,
          type: 'number',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (alertData) => {
            this.addProduct(alertData, product);
          },
        },
      ],
    });

    await alert.present();
  }

  private addProduct(alertData, product) {
    if (product) {
      product.name = alertData.name,
      product.brand = alertData.brand,
      product.store = alertData.store,
      product.unitPrice = alertData.unitPrice,
      product.quantity = alertData.quantity,
      product.amount = Number(alertData.unitPrice) * Number(alertData.quantity),
      product.onCar = alertData.onCar
    } else {
      this.shopping.products.push({
        id: this.shopping.products.length + 1,
        name: alertData.name,
        brand: alertData.brand,
        store: alertData.store,
        unitPrice: alertData.unitPrice,
        quantity: alertData.quantity,
        amount: Number(alertData.unitPrice) * Number(alertData.quantity),
        onCar: alertData.onCar
      });
    }
  }
}
