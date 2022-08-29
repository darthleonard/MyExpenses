import { Component, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormControlComponent } from '../../form/form-control.component';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
})
export class SelectModalComponent extends FormControlComponent {
  @ViewChild(IonModal) modal: IonModal;

  @Input() dataSource: any[];

  filter: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const existingItem = this.dataSource.find(
      (item) => item.value.toLowerCase() === this.filter.toLocaleLowerCase()
    );
    let value;
    if (existingItem) {
      value = existingItem.value;
    } else {
      // TODO: add this.dilter to dataSource origin(table/service)
      value = this.filter;
    }
    this.setValueAndClose(value);
  }

  onSelect(data: any) {
    this.setValueAndClose(data.value);
  }

  onSearchChange(event) {
    this.filter = event.detail.value;
  }

  private setValueAndClose(value: any) {
    this.form.controls[this.formControltMetadata.key].setValue(value);
    this.modal.dismiss(null, 'confirm');
  }
}
