import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormControlMetadata } from './controls/form-control-metadata';
import { MetadataControlService } from './metadata-control.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [MetadataControlService],
})
export class FormComponent implements OnInit {
  constructor(private metadataControlService: MetadataControlService) {}

  @Input() formControlsMetadata: FormControlMetadata<string>[] | null = [];
  @Input() showCancelButton: boolean;
  @Input() entity: any;

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();

  form!: FormGroup;
  payLoad = '';

  ngOnInit() {
    if(this.entity) {
      this.formControlsMetadata.forEach(m => m.value = this.entity[m.key]);
    }
    this.form = this.metadataControlService.toFormGroup(
      this.formControlsMetadata as FormControlMetadata<string>[]
    );
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.submit.emit(this.form.getRawValue());
  }

  onCancel() {
    this.cancel.emit();
  }
}
