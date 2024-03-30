import { Component, ViewChild } from '@angular/core';
import { Store } from 'src/app/database/database';
import { DataServiceFactory } from 'src/app/database/data-service.factory';
import { DataService } from 'src/app/database/data-service';
import { StoreMetadataService } from './store-metadata.service';
import { FormControlMetadata } from '@components/form/controls/form-control-metadata';
import { ModalFormComponent } from '@components/modal-form/modal-form.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  providers: [StoreMetadataService],
})
export class StoresPage {
  private dataService: DataService;
  private storesMetadata: FormControlMetadata<string>[];

  @ViewChild(ModalFormComponent) private modalForm: ModalFormComponent;

  constructor(
    private readonly dataServiceFactory: DataServiceFactory,
    private readonly storesMetadataService: StoreMetadataService
  ) {}

  stores: Store[] = [];

  ionViewWillEnter() {
    this.dataService = this.dataServiceFactory.build('stores');
    this.dataService.getEntities().then((e) => (this.stores = e));
  }

  async onAddClick() {
    await this.openStoreModal();
  }

  async onEditClick(store: Store) {
    await this.openStoreModal(store);
  }

  onDeleteClick(store: Store) {
    this.stores = this.stores.filter((i) => i.id !== store.id);
    this.dataService.delete(store.id);
  }

  validateFn = (store: Store) => {
    if (
      this.stores
        .map((s) => s.name.toLowerCase())
        .includes(store.name.toLowerCase())
    ) {
      return { message: `store [${store.name}] already exist` };
    }
    return null;
  };

  async onModalConfirm(store: Store) {
    if (!store.id) {
      this.stores.push(store);
    }
    store = await this.dataService.saveEntity(store);
    this.stores = await this.dataService.getEntities();
  }

  private async openStoreModal(store?: any) {
    if (!this.storesMetadata) {
      this.storesMetadata = await this.storesMetadataService
        .getControls()
        .toPromise();
    }

    await this.modalForm.Open(this.storesMetadata, store);
  }
}
