import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { LookupControl } from 'src/app/components/form/controls/lookup-control';
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
        order: 1
      }),
      // new TextboxControl({
      //   key: 'brand',
      //   label: 'Brand',
      //   order: 2
      // }),
      // new LookupControl({
      //   key: 'store',
      //   label: 'Store',
      //   endpoint: 'storeList',
      //   order: 3
      // })
    ];

    return of(controlMetadata.sort((a, b) => a.order - b.order));
  }
}
