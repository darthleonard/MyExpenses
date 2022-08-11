import { FormControlMetadata } from './form-control-metadata';

export class DropdownControl extends FormControlMetadata<string> {
  override controlType = 'dropdown';
}