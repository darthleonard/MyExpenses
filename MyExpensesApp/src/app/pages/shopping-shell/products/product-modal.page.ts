import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { ProductMetadataService } from './product-metadata.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.page.html',
  providers: [ProductMetadataService],
})
export class ProductModalPage implements OnInit {
  constructor(
    private readonly productMetadataService: ProductMetadataService,
    private readonly modalController: ModalController
  ) {}

  @Input() product: any;

  metadata: FormControlMetadata<string>[];

  ngOnInit() {
    this.productMetadataService
      .getControls()
      .subscribe((m) => (this.metadata = m));
  }

  onAccept(product: any) {
    this.modalController.dismiss(product, 'accept');
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }
}
