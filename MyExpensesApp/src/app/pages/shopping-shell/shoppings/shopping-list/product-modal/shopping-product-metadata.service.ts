import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { DropdownControl } from 'src/app/components/form/controls/dropdown-control';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { LookupControl } from 'src/app/components/form/controls/lookup-control';
import { TextboxControl } from 'src/app/components/form/controls/textbox-control';

@Injectable()
export class ShoppingProductMetadataService {
  // TODO: get from a remote source of controls metadata
  getControls() {
    const controlMetadata: FormControlMetadata<string>[] = [
      new TextboxControl({
        key: 'id',
        visible: false
      }),
      new LookupControl({
        key: 'name',
        label: 'Product Name',
        required: true,
        endpoint: 'products',
        order: 1
      }),
      // new TextboxControl({
      //   key: 'brand',
      //   label: 'Brand',
      //   order: 2
      // }),
      new LookupControl({
        key: 'store',
        label: 'Store',
        endpoint: 'stores',
        order: 3
      }),
      // keep this as a example, may be this DropdownControl will be eliminated
      // new DropdownControl({
      //   key: 'store',
      //   label: 'Store',
      //   dropdownOptions: [
      //     { key: 'chedraui', value: 'Chedrahui' },
      //     { key: 'oxxo', value: 'Oxxo' },
      //     { key: 'otro', value: 'Otro' },
      //     { key: 'notset', value: 'Not Set' },
      //   ],
      //   order: 3
      // }),
      new TextboxControl({
        key: 'unitPrice',
        label: 'Price',
        type: 'number',
        order: 4
      }),
      new TextboxControl({
        key: 'quantity',
        label: 'Quantity',
        type: 'number',
        value: '1',
        order: 5
      }),
      new TextboxControl({
        key: 'totalAmount',
        label: 'Total',
        type: 'number',
        readonly: true,
        order: 6
      })
    ];

    return of(controlMetadata.sort((a, b) => a.order - b.order));
  }
}
