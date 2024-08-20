import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { FormControlMetadata } from './controls/form-control-metadata';

@Injectable()
export class MetadataControlService {
  constructor() {}

  toFormGroup(controlsMetadata: FormControlMetadata<string>[]) {
    const group: any = {};

    controlsMetadata.forEach(m => {
      group[m.key] = m.required
        ? new UntypedFormControl(m.value || '', Validators.required)
        : new UntypedFormControl(m.value || '');
    });
    return new UntypedFormGroup(group);
  }
}
