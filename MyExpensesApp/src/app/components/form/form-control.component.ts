import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormControlMetadata } from './controls/form-control-metadata';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
})
export class FormControlComponent {
  @Input() formControltMetadata!: FormControlMetadata<string>;
  @Input() form!: FormGroup;

  get isValid() {
    return this.form.controls[this.formControltMetadata.key].valid;
  }
}
