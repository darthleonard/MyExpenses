import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormControlMetadata } from './controls/form-control-metadata';
import { FormPropertyChangedArgs } from './form-property-changed-args';
import { MetadataControlService } from './metadata-control.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [MetadataControlService],
})
export class FormComponent implements OnInit {
  private _entity: any;
  constructor(private metadataControlService: MetadataControlService) {}

  @Input() formControlsMetadata: FormControlMetadata<string>[] | null = [];
  @Input() showCancelButton: boolean;
  @Input() set entity(entity: any) {
    this._entity = entity ?? {};
  }
  get entity() {
    if (!this._entity) {
      this._entity = {};
    }
    return this._entity;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() propertyChanged: EventEmitter<FormPropertyChangedArgs> =
    new EventEmitter();

  form!: FormGroup;

  ngOnInit() {
    this.updateEntity();
  }

  onSubmit() {
    this.submit.emit(this.entity);
  }

  onCancel() {
    this.cancel.emit();
  }

  updateEntity() {
    this.formControlsMetadata.forEach((m) => {
      if (!!this.entity[m.key]) {
        m.value = this.castValue(this.entity[m.key], m.type);
      } else {
        this.entity[m.key] = this.castValue(m.value, m.type);
      }
    });
    this.form = this.metadataControlService.toFormGroup(
      this.formControlsMetadata as FormControlMetadata<string>[]
    );
  }

  protected onPropertyChanged(args: { name: string; value: any }) {
    const previousValue = this.entity ? this.entity[args.name] : undefined;
    if (previousValue === args.value) {
      return;
    }
    this.entity[args.name] = args.value;
    this.propertyChanged.emit({
      propertyName: args.name,
      previousValue: previousValue,
      currentValue: args.value,
    });
  }

  private castValue(value: any, type: string) {
    switch(type) {
      case 'number':
        return isNaN(Number(value)) ? 0 : Number(value);
      default:
        return value;
    }
  }
}
