import { FormControlMetadata } from './form-control-metadata';

export class TextboxControl extends FormControlMetadata<string> {
  override controlType = 'textbox';
}