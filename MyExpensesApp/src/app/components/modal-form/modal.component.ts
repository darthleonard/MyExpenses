import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControlMetadata } from '../form/controls/form-control-metadata';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  constructor(private readonly modalController: ModalController) {}

  @Input() title: string;
  @Input() metadata: FormControlMetadata<string>[];
  @Input() showCancelButton: boolean = true;
  @Input() entity: Record<string, string>;

  onAccept(entity: any) {
    this.modalController.dismiss(entity, 'accept');
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }
}
