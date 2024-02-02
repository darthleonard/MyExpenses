import { Component, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { Shopping } from 'src/app/database/database';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { ShoppingMetadataService } from './shopping-metadata.service';
import { ModalFormComponent } from 'src/app/components/modal-form/modal-form.component';
import { DataServiceFactory } from 'src/app/database/data-service.factory';
import { DataService } from 'src/app/database/data-service';

@Component({
  selector: 'app-shoppings',
  templateUrl: './shoppings.page.html',
  providers: [ShoppingMetadataService],
})
export class ShoppingsPage {
  private dataService: DataService;
  private shoppingsMetadata: FormControlMetadata<string>[];

  @ViewChild(IonList) ionList: IonList;
  @ViewChild(ModalFormComponent) private readonly modalForm: ModalFormComponent;

  constructor(
    private readonly dataServiceFactory: DataServiceFactory,
    private readonly shoppingMetadataService: ShoppingMetadataService
  ) {}

  loading = false;
  shoppingLists: Shopping[] = [];

  ionViewWillEnter() {
    this.loading = true;
    this.dataService = this.dataServiceFactory.build('shoppings');
    this.dataService.getEntities().then((e) => {
      this.shoppingLists = e;
      this.loading = false;
    });
  }

  doRefresh(event: any) {
    this.loading = true;
    this.dataService.getEntities().then((e) => {
      this.shoppingLists = e;
      event.target.complete();
      this.loading = false;
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
    this.shoppingLists = this.shoppingLists.filter((i) => i.id !== item.id);
    this.dataService.delete(item.id);
  }

  async onModalConfirm(shopping: Shopping) {
    if (!shopping.id) {
      this.shoppingLists.push(shopping);
    }
    shopping = await this.dataService.saveEntity(shopping);
    this.shoppingLists = await this.dataService.getEntities();
  }

  private async openShoppingListtModal(shoppingList?: any) {
    if (!this.shoppingsMetadata) {
      this.shoppingsMetadata = await this.shoppingMetadataService
        .getControls()
        .toPromise();
    }

    await this.modalForm.Open(this.shoppingsMetadata, shoppingList);
  }
}
