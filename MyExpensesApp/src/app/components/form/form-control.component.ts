import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormControlMetadata } from './controls/form-control-metadata';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
})
export class FormControlComponent {
  @Input() formControltMetadata!: FormControlMetadata<string>;
  @Input() form!: FormGroup;

  @Output() propertyChanged: EventEmitter<{ name: string; value: any }> =
    new EventEmitter();

  get isValid() {
    return this.form.controls[this.formControltMetadata.key].valid;
  }

  // to detect changes while typing or assigning the whole value
  onChange() {
    this.emitPropertyChanged();
  }

  // to detect changes until input lost focus, used on normal inputs
  onBlur() {
    if (this.form.controls[this.formControltMetadata.key].pristine) {
      return;
    }
    this.emitPropertyChanged();
  }

  private emitPropertyChanged() {
    this.propertyChanged.emit({
      name: this.formControltMetadata.key,
      value: this.castValue(),
    });
  }

  private castValue() {
    const value = this.form.controls[this.formControltMetadata.key].value;
    switch(this.formControltMetadata.type) {
      case 'number':
        return Number(value);
      default:
        return value;
    }
  }
}
