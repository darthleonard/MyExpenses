import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { DropdownControl } from 'src/app/components/form/controls/dropdown-control';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { TextboxControl } from 'src/app/components/form/controls/textbox-control';

@Injectable()
export class ProductMetadataService {
  // TODO: get from a remote source of controls metadata
  getControls() {
    const controlMetadata: FormControlMetadata<string>[] = [
      new TextboxControl({
        key: 'id',
        visible: false
      }),
      new TextboxControl({
        key: 'name',
        label: 'Product Name',
        required: true,
        order: 1,
      }),
      new TextboxControl({
        key: 'brand',
        label: 'Brand',
        order: 2,
      }),
      new DropdownControl({
        key: 'store',
        label: 'Store',
        dropdownOptions: [
          { key: 'chedraui', value: 'Chedrahui' },
          { key: 'ahorrera', value: 'Ahorrera' },
          { key: 'oxxo', value: 'Oxxo' },
          { key: 'notset', value: 'Not Set' },
        ],
        order: 3,
      }),
      new TextboxControl({
        key: 'unitPrice',
        label: 'Price',
        type: 'number',
        order: 4,
      }),
      new TextboxControl({
        key: 'quantity',
        label: 'Quantity',
        type: 'number',
        value: '1',
        order: 5,
      })
    ];

    return of(controlMetadata.sort((a, b) => a.order - b.order));
  }
}
