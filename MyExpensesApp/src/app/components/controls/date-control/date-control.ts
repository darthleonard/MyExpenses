import { FormControlMetadata } from '../../form/controls/form-control-metadata';

export class DateControl extends FormControlMetadata<string> {
  override controlType = 'date';
}