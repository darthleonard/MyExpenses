import { Component, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormControlComponent } from '../../form/form-control.component';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
})
export class SelectModalComponent extends FormControlComponent{
  @ViewChild(IonModal) modal: IonModal;

  name: string;
  filter: string;
  dataSource: any[] = [
    { key: 'chedraui', name: 'Chedrahui' },
    { key: 'oxxo', name: 'Oxxo' },
    { key: 'otro', name: 'Otro' },
    { key: 'notset', name: 'Not Set' }
  ];

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.name = this.filter;
    this.form.controls[this.formControltMetadata.key].setValue(this.filter);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      
    }
  }

  onSearchChange(event) {
    this.filter = event.detail.value;
  }
}
