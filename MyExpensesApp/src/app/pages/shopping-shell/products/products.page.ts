import { Component, ViewChild } from '@angular/core';
import { orderBy } from 'lodash';
import { Product } from 'src/app/database/database';
import { DataServiceFactory } from 'src/app/database/data-service.factory';
import { DataService } from 'src/app/database/data-service';
import { ModalFormComponent } from 'src/app/components/modal-form/modal-form.component';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { ProductMetadataService } from './product-metadata.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  providers: [ProductMetadataService]
})
export class ProductsPage {
  private dataService: DataService;
  private productsMetadata: FormControlMetadata<string>[];

  @ViewChild(ModalFormComponent) private readonly modalForm: ModalFormComponent;

  constructor(
    private readonly dataServiceFactory: DataServiceFactory,
    private readonly productsMetadataService: ProductMetadataService
  ) {}

  products: Product[] = [];

  ionViewWillEnter() {
    this.dataService = this.dataServiceFactory.build('products');
    this.dataService.getEntities().then((e) => (this.products = orderBy(e, 'name')));
  }

  async onAddClick() {
    await this.openProductModal();
  }

  async onEditClick(product: Product) {
    await this.openProductModal(product);
  }

  onDeleteClick(product: Product) {
    this.products = this.products.filter((i) => i.id !== product.id);
    this.dataService.delete(product.id);
  }

  async onModalConfirm(product: Product) {
    if (!product.id) {
      this.products.push(product);
    }
    product = await this.dataService.saveEntity(product);
    this.products = await this.dataService.getEntities();
  }

  private async openProductModal(product?: any) {
    if (!this.productsMetadata) {
      this.productsMetadata = await this.productsMetadataService
        .getControls()
        .toPromise();
    }

    await this.modalForm.Open(this.productsMetadata, product);
  }
}
