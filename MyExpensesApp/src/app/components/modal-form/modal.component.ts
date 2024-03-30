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
  @Input() validateFn: (args: any) => any; // https://stackoverflow.com/a/71355979/13789403

  validationResult : { message: string };

  onAccept(entity: any) {
    // This is called twice, so this skips when called with whole form object
    if(entity.type && entity.type === "submit") {
      return;
    }

    this.validationResult = this.validateFn(entity);
    if(this.validationResult) {
      return;
    }
    
    this.modalController.dismiss(entity, 'accept');
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }
}
