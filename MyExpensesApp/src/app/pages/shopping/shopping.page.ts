import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Shopping, ShoppingRepository } from './shopping';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {
  constructor(private alertController: AlertController) {}

  shoppingRepository = {
    shoppingLists: [
      {
        id: 'a',
        creationDate: new Date(),
        lastModDate: new Date(),
        effectiveDate: new Date(),
        name: 'utiles escolares',
        products: [],
      } as Shopping,
      {
        id: 'b',
        creationDate: new Date(),
        lastModDate: new Date(),
        effectiveDate: new Date(),
        name: 'despensa',
        products: [],
      } as Shopping,
      {
        id: 'c',
        creationDate: new Date(),
        lastModDate: new Date(),
        effectiveDate: new Date(),
        name: 'name of list 3',
        products: [],
      } as Shopping,
    ],
  } as ShoppingRepository;

  ngOnInit() {}

  // onItemClick() {
  //   console.log('navigate to list');
  //   this.router.navigate(['/shopping-list'])
  // }

  async onAddClick() {
    await this.presentAlert();
  }

  async onEditClick(item: Shopping) {
    await this.presentAlert(item);
  }

  async onDeleteClick(item: Shopping) {
    this.shoppingRepository.shoppingLists =
      this.shoppingRepository.shoppingLists.filter((s) => s.id !== item.id);
  }

  private async presentAlert(item?: Shopping) {
    const title = item ? 'Edit' : 'New';
    const alert = await this.alertController.create({
      header: `${title} list`,
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item?.name,
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
            this.someFunction(alertData, item);
          },
        },
      ],
    });

    await alert.present();
  }

  private someFunction(alertData, item) {
    if (item) {
      item.name = alertData.name;
    } else if (alertData.name) {
      console.log('proceed create', alertData);
    } else {
      console.log('data invalid');
    }
  }
}
