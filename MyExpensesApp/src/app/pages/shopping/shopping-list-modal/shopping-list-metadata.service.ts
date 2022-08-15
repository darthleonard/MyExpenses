import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { TextboxControl } from 'src/app/components/form/controls/textbox-control';

@Injectable()
export class ShoppingListMetadataService {
  getControls() {
    const controlMetadata: FormControlMetadata<string>[] = [
      new TextboxControl({
        key: 'name',
        label: 'List Name',
        required: true,
        order: 1,
      }),
      new TextboxControl({
        key: 'date',
        label: 'Date',
        order: 2,
      }),
    ];

    return of(controlMetadata.sort((a, b) => a.order - b.order));
  }
}
