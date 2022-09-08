import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Shopping } from 'src/app/database/database';
import { ShoppingDataService } from 'src/app/database/shopping-data.service';
import { ShoppingListtModalPage } from './shopping-list-modal/shopping-list-modal.page';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html'
})
export class ShoppingPage implements OnInit {
  constructor(
    private readonly dataService: ShoppingDataService,
    private readonly modalController: ModalController
  ) {}

  shoppingLists: Shopping[] = [];

  ngOnInit() {
    this.dataService
      .getShoppingLists()
      .subscribe((r) => (this.shoppingLists = r));
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
    modal.onDidDismiss().then(async (data) => {
      const paramsFilter = data?.data;
      if (paramsFilter) {
        if(paramsFilter.id) {
          let p = this.shoppingLists.find(p => p.id === paramsFilter.id);
          let index = this.shoppingLists.indexOf(p);
          this.shoppingLists[index] = paramsFilter;
        }
        await this.dataService.saveShoppingLists(paramsFilter);
      }
    });
    await modal.present();
  }
}
