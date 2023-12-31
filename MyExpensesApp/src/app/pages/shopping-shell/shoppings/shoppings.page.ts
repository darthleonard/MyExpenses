import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { Shopping } from 'src/app/database/database';
import { ShoppingDataService } from 'src/app/database/shopping-data.service';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { ShoppingMetadataService } from './shopping-metadata.service';
import { ModalFormComponent } from 'src/app/components/modal-form/modal-form.component';

@Component({
  selector: 'app-shoppings',
  templateUrl: './shoppings.page.html',
  providers: [ShoppingMetadataService]
})
export class ShoppingsPage implements OnInit {
  private shoppingsMetadata: FormControlMetadata<string>[];

  @ViewChild(IonList) ionList: IonList;
  @ViewChild(ModalFormComponent) private readonly modalForm: ModalFormComponent;

  constructor(
    private readonly dataService: ShoppingDataService,
    private readonly shoppingMetadataService: ShoppingMetadataService
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
