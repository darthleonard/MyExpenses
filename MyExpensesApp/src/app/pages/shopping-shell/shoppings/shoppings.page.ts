import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ModalController } from '@ionic/angular';
import { Shopping } from 'src/app/database/database';
import { ShoppingDataService } from 'src/app/database/shopping-data.service';
import { ShoppingListtModalPage } from './shopping-list-modal/shopping-list-modal.page';

@Component({
  selector: 'app-shoppings',
  templateUrl: './shoppings.page.html'
})
export class ShoppingsPage implements OnInit {

  @ViewChild(IonList) ionList: IonList;

  constructor(
    private readonly dataService: ShoppingDataService,
    private readonly modalController: ModalController
  ) {}

  shoppingLists: Shopping[] = [];

  ngOnInit() {
    this.dataService.getEntities().then((e) => (this.shoppingLists = e));
  }

  doRefresh(event: any) {
    this.dataService.getEntities().then((e) => {
      this.shoppingLists = e;
      event.target.complete();
    });
  }

  async onAddClick() {
    await this.openShoppingListtModal();
  }

  async onEditClick(item: Shopping) {
    await this.openShoppingListtModal(item);
    this.ionList.closeSlidingItems();
  }

  async onDeleteClick(item: Shopping) {
    this.shoppingLists = this.shoppingLists.filter(i => i.id !== item.id);
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

      if(shoppingList?.id) {
        shoppingList.name = listData.data.name;
        shoppingList.effectiveDate = listData.data.effectiveDate;
        shoppingList = await this.dataService.saveEntity(shoppingList);
      } else {
        shoppingList = await this.dataService.saveEntity(listData.data);
        this.shoppingLists.push(shoppingList);
      }
    });
    await modal.present();
  }

}
