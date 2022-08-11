import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormControlMetadata } from './controls/form-control-metadata';
import { MetadataControlService } from './metadata-control.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [MetadataControlService],
})
export class FormComponent implements OnInit {
  @Input() formControlsMetadata: FormControlMetadata<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private metadataControlService: MetadataControlService) {}

  ngOnInit() {
    this.form = this.metadataControlService.toFormGroup(this.formControlsMetadata as FormControlMetadata<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
