import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { StoresMetadataService } from './stores-metadata.service';

@Component({
  selector: 'app-store-modal',
  templateUrl: './store-modal.page.html',
  providers: [StoresMetadataService],
})
export class StoreModalPage implements OnInit {

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

  onAccept(store: any) {
    this.modalController.dismiss(store, 'accept');
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }
}
