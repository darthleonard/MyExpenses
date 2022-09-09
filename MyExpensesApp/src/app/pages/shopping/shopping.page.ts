import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Shopping } from 'src/app/database/database';
import { ShoppingDataService } from 'src/app/database/shopping-data.service';
import { ShoppingListtModalPage } from './shopping-list-modal/shopping-list-modal.page';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
})
export class ShoppingPage implements OnInit {
  constructor(
    private readonly dataService: ShoppingDataService,
    private readonly modalController: ModalController
  ) {}

  shoppingLists: Shopping[] = [];

  ngOnInit() {
    this.dataService.getEntities().then((e) => (this.shoppingLists = e));
  }

  async onAddClick() {
    await this.openShoppingListtModal();
  }

  async onEditClick(item: Shopping) {
    await this.openShoppingListtModal(item);
  }

  async onDeleteClick(item: Shopping) {
    this.dataService.delete(item);
  }

  private async openShoppingListtModal(shoppingList?: any) {
    const modal = await this.modalController.create({
      component: ShoppingListtModalPage,
      componentProps: {
        shoppingList: shoppingList,
      },
      backdropDismiss: false,
      cssClass: 'half-modal',
    });
    modal.onDidDismiss().then(async (listData) => {
      if (listData.role === 'cancel') {
        return;
      }

      shoppingList = await this.dataService.saveEntity(listData.data);
      this.shoppingLists.push(shoppingList);
    });
    await modal.present();
  }
}
