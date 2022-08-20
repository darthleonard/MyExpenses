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
    if(!this._entity) {
      this._entity = {};
    }
    return this._entity;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() propertyChanged: EventEmitter<FormPropertyChangedArgs> =
    new EventEmitter();

  form!: FormGroup;
  payLoad = '';

  ngOnInit() {
    this.updateEntity();
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.submit.emit(this.form.getRawValue());
  }

  onCancel() {
    this.cancel.emit();
  }

  updateEntity() {
    this.formControlsMetadata.forEach((m) => (m.value = this.entity[m.key]));
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
}
