import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { DateControl } from 'src/app/components/controls/date-control/date-control';
import { FormControlMetadata } from 'src/app/components/form/controls/form-control-metadata';
import { TextboxControl } from 'src/app/components/form/controls/textbox-control';

@Injectable()
export class ShoppingListMetadataService {
  getControls() {
    const controlMetadata: FormControlMetadata<string>[] = [
      new TextboxControl({
        key: 'id',
        visible: false
      }),
      new TextboxControl({
        key: 'name',
        label: 'List Name',
        required: true,
        order: 1,
      }),
      new DateControl({
        key: 'effectiveDate',
        label: 'Date',
        value: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),
        order: 2
      }),
    ];

    return of(controlMetadata.sort((a, b) => a.order - b.order));
  }
}
