import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { StoreMetadataService } from './store-metadata.service';

@Component({
  selector: 'app-store-modal',
  templateUrl: './store-modal.page.html',
  providers: [StoreMetadataService],
})
export class StoreModalPage implements OnInit {

  constructor(
    private readonly storesMetadataService: StoreMetadataService,
    private readonly modalController: ModalController
  ) {}

  @Input() store: any;

  metadata: FormControlMetadata<string>[];

  ngOnInit() {
    this.storesMetadataService
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
