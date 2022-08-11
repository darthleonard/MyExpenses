import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Product, Shopping } from '../shopping';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {

  constructor(private alertController: AlertController) { }

  shopping = {
    id: 'a',
    creationDate: new Date(),
    lastModDate: new Date(),
    effectiveDate: new Date(),
    name: 'utiles escolares',
    products: [
      {
        id: 'a',
        name: 'product name',
        brand: 'product brand',
        store: 'where it was bought',
        unitPrice: 3.5,
        quantity: 2,
        amount: 3.5 * 2,
        onCar: true
      },
      {
        id: 'b',
        name: 'product name',
        brand: 'product brand',
        store: 'where it was bought',
        unitPrice: 3.5,
        quantity: 2,
        amount: 3.5 * 2,
        onCar: true
      },
      {
        id: 'c',
        name: 'product name',
        brand: 'product brand',
        store: 'where it was bought',
        unitPrice: 3.5,
        quantity: 2,
        amount: 3.5 * 2,
        onCar: true
      },
      {
        id: 'd',
        name: 'product name',
        brand: 'product brand',
        store: 'where it was bought',
        unitPrice: 3.5,
        quantity: 2,
        amount: 3.5 * 2,
        onCar: true
      },
      {
        id: 'e',
        name: 'product name',
        brand: 'product brand',
        store: 'where it was bought',
        unitPrice: 3.5,
        quantity: 2,
        amount: 3.5 * 2,
        onCar: true
      },
      {
        id: 'f',
        name: 'product name',
        brand: 'product brand',
        store: 'where it was bought',
        unitPrice: 3.5,
        quantity: 2,
        amount: 3.5 * 2,
        onCar: true
      },
      {
        id: 'g',
        name: 'product name',
        brand: 'product brand',
        store: 'where it was bought',
        unitPrice: 3.5,
        quantity: 2,
        amount: 3.5 * 2,
        onCar: true
      },
      {
        id: 'h',
        name: 'product name',
        brand: 'product brand',
        store: 'where it was bought',
        unitPrice: 3.5,
        quantity: 2,
        amount: 3.5 * 2,
        onCar: true
      }
    ],
  } as Shopping;

  ngOnInit() {
  }

  onAddClick() {
    this.presentAlert();
  }

  onEditClick(product: Product) {
    this.presentAlert(product);
  }

  onDeleteClick(product: Product) {
    this.shopping.products = this.shopping.products.filter(p => p.id !== product.id);
  }

  private async presentAlert(product?: Product) {
    const title = product ? 'Edit' : 'New';
    const alert = await this.alertController.create({
      header: `${title} Product`,
      backdropDismiss: false,
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: product?.name
        },
        {
          name: 'brand',
          placeholder: 'Brand',
          value: product?.brand
        },
        {
          name: 'store',
          placeholder: 'Store',
          value: product?.store
        },
        {
          name: 'unitPrice',
          placeholder: 'Price',
          value: product?.unitPrice,
          type: 'number'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: product?.quantity,
          type: 'number'
        }
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
            this.saveProduct(alertData, product);
          },
        },
      ],
    });

    await alert.present();
  }

  private saveProduct(alertData, product) {
    if(product) {
      product.name = alertData.name;
    } else {
      this.shopping.products.push(alertData);
    }
  }

  onSaveList() {

  }
}
