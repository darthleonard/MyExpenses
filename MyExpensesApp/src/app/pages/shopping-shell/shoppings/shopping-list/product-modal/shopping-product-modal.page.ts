import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { FormPropertyChangedArgs } from 'src/app/components/form/form-property-changed-args';
import { FormComponent } from 'src/app/components/form/form.component';
import { ShoppingProductMetadataService } from './shopping-product-metadata.service';

@Component({
  selector: 'app-shopping-product-modal',
  templateUrl: './shopping-product-modal.page.html',
  providers: [ShoppingProductMetadataService],
})
export class ShoppingProductModalPage implements OnInit {
  @ViewChild(FormComponent) private form: FormComponent;

  constructor(
    private readonly productMetadataService: ShoppingProductMetadataService,
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
    this.modalController.dismiss(product);
  }

  onCancel() {
    this.modalController.dismiss();
  }

  onPropertyChanged(args: FormPropertyChangedArgs) {
    if (['unitPrice', 'quantity'].includes(args.propertyName)) {
      this.form.entity.totalAmount =
        this.form.entity.unitPrice * this.form.entity.quantity;
      this.form.updateEntity();
    }
  }
}
