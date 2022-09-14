import { FormControlMetadata } from './form-control-metadata';

export class LookupControl extends FormControlMetadata<string> {
  override controlType = 'lookup';
}