import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControlMetadata } from '../form/controls/form-control-metadata';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'modal-form',
  template: '',
})
export class ModalFormComponent {
  constructor(private readonly modalController: ModalController) {}

  @Input() title: string = 'Record';
  @Input() showCancelButton: boolean = true;
  @Input() validateFn: (args: any) => {};
  @Output() confirm = new EventEmitter<any>();

  async Open(metadata: FormControlMetadata<string>[], entity: any) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        title: `${entity ? 'Edit' : 'New'} ${this.title}`,
        entity: entity,
        metadata: metadata,
        showCancelButton: this.showCancelButton,
        validateFn: this.validateFn
      },
      backdropDismiss: false,
    });
    modal.onDidDismiss().then(async (response) => {
      if (response.role === 'cancel') {
        return;
      }
      this.confirm.emit(response.data);
    });
    await modal.present();
  }
}
