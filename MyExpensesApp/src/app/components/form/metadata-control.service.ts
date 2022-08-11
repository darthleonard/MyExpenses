import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormControlMetadata } from './controls/form-control-metadata';

@Injectable()
export class MetadataControlService {
  constructor() {}

  toFormGroup(controlsMetadata: FormControlMetadata<string>[]) {
    const group: any = {};

    controlsMetadata.forEach(m => {
      group[m.key] = m.required
        ? new FormControl(m.value || '', Validators.required)
        : new FormControl(m.value || '');
    });
    return new FormGroup(group);
  }
}
