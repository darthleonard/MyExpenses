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

  onChange() {
    // it will be good emit something? (filter an autocomplete or something)
  }

  onBlur() {
    if (this.form.controls[this.formControltMetadata.key].pristine) {
      return;
    }
    this.propertyChanged.emit({
      name: this.formControltMetadata.key,
      value: this.form.controls[this.formControltMetadata.key].value,
    });
  }
}
