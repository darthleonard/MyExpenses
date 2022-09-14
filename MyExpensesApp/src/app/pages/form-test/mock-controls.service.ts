import { Injectable } from '@angular/core';

import { DropdownControl } from '../../components/form/controls/dropdown-control';
import { FormControlMetadata } from '../../components/form/controls/form-control-metadata';
import { TextboxControl } from '../../components/form/controls/textbox-control';
import { of } from 'rxjs';

@Injectable()
export class MockControlsService {
  // TODO: get from a remote source of controls metadata
  getControls() {
    const controlMetadata: FormControlMetadata<string>[] = [
      new DropdownControl({
        key: 'brave',
        label: 'Bravery Rating',
        dropdownOptions: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        order: 3,
      }),

      new TextboxControl({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1,
      }),

      new TextboxControl({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
      }),
    ];

    return of(controlMetadata.sort((a, b) => a.order - b.order));
  }
}
