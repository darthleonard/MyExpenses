export class FormControlMetadata<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  visible: boolean;
  readonly: boolean;
  dropdownOptions: { key: string; value: string }[];

  constructor(
    property: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      visible?: boolean;
      readonly?: boolean;
      dropdownOptions?: { key: string; value: string }[];
    } = {}
  ) {
    this.value = property.value;
    this.key = property.key || '';
    this.label = property.label || '';
    this.required = !!property.required;
    this.order = property.order === undefined ? 1 : property.order;
    this.controlType = property.controlType || '';
    this.type = property.type || '';
    this.visible = property.visible === undefined ? true : property.visible;
    this.readonly = property.readonly === undefined ? false : property.readonly;
    this.dropdownOptions = property.dropdownOptions || [];
  }
}
