import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Shopping } from 'src/app/database/database';
import { ShoppingDataService } from 'src/app/database/shopping-data.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly dataService: ShoppingDataService,
    private readonly alertController: AlertController
  ) {}

  shoppingLists: Shopping[] = [];

  ngOnInit() {
    this.dataService
      .getShoppingLists()
      .subscribe((r) => (this.shoppingLists = r));
  }

  async onAddClick() {
    await this.presentAlert();
  }

  async onEditClick(item: Shopping) {
    await this.presentAlert(item);
  }

  async onDeleteClick(item: Shopping) {
    this.dataService.delete(item);
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
          handler: async (alertData) => {
            await this.someFunction(alertData, item);
          },
        },
      ],
    });

    await alert.present();
  }

  private async someFunction(alertData, item) {
    if (item) {
      item.name = alertData.name;
      this.dataService.saveShoppingLists(item);
    } else if (alertData.name) {
      console.log('proceed create', alertData);
      await this.dataService.saveShoppingLists(alertData);
      //this.router.navigate(['shopping/shopping-list', item.id]);
    } else {
      console.log('data invalid');
    }
  }
}
