import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { FormComponent } from 'src/app/components/form/form.component';
import { StoresMetadataService } from './stores-metadata.service';

@Component({
  selector: 'app-store-modal',
  templateUrl: './store-modal.page.html',
  providers: [StoresMetadataService],
})
export class StoreModalPage implements OnInit {
  @ViewChild(FormComponent) private form: FormComponent;

  constructor(
    private readonly productMetadataService: StoresMetadataService,
    private readonly modalController: ModalController
  ) {}

  @Input() store: any;

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
