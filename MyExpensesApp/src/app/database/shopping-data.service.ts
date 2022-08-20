import { Injectable } from '@angular/core';
import { DataServiceBase } from './data.service';
import { liveQuery } from 'dexie';
import { database, Shopping } from './database';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ShoppingDataService {
  constructor(public toastController: ToastController) {}

  async getShoppingList(id: number) {
    return await database.shoppingLists.get(id);
  }

  getShoppingLists() {
    return liveQuery(() => database.shoppingLists.toArray());
  }

  async saveShoppingLists(shopping: Shopping) {
    if (!shopping.hasOwnProperty('id') || !shopping.id) {
      shopping.creationDate = new Date();
      shopping.total = 0;
    }

    shopping.total = 0;
    shopping.products.filter(p => p.onCar).forEach(p => shopping.total += p.totalAmount);
    shopping.lastModDate = new Date();
    await database.shoppingLists.put(shopping);
    await this.showToast('Saved');
  }

  delete(shopping: Shopping) {
    database.shoppingLists.delete(shopping.id);
  }

  private async showToast(message: string) {
    (
      await this.toastController.create({
        message: message,
        duration: 2000,
      })
    ).present();
  }
}
