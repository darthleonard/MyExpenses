import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { TextboxControl } from 'src/app/components/form/controls/textbox-control';

@Injectable()
export class StoresMetadataService {
  getControls() {
    const controlMetadata: FormControlMetadata<string>[] = [
      new TextboxControl({
        key: 'id',
        visible: false
      }),
      new TextboxControl({
        key: 'name',
        label: 'Store Name',
        required: true,
        order: 1
      })
    ];

    return of(controlMetadata.sort((a, b) => a.order - b.order));
  }
}
