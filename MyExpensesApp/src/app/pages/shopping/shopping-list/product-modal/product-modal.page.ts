import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { FormPropertyChangedArgs } from 'src/app/components/form/form-property-changed-args';
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

  onAccept(event: any) {
    this.modalController.dismiss(event);
  }

  onCancel() {
    this.modalController.dismiss();
  }

  onPropertyChanged(args: FormPropertyChangedArgs) {
    if (['unitPrice'].includes(args.propertyName)) {
      console.log(args);
      console.log('update total price');
    }
  }
}
