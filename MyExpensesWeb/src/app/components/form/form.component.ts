import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  forma: FormGroup;
  controls: FormControl[];
  entity: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createForm(controls: FormControl[]) {
    var formGroup = {};
    controls.forEach(control => formGroup[control.fieldName] = ['', control.required, control.validatorsAsync]);
    this.forma = this.fb.group(formGroup);
    this.controls = controls;
  }

  guardar() {
    console.log(this.forma.value);
  }

  onInput(value: string) {
    value = value.replace(/[^0-9.]/g, ''); value = value.replace(/(\..*)\./g, '$1');
  }
}

interface FormControl {
  fieldName: string;
  displayName: string;
  required: Validators;
  validatorsAsync: any;
  visible: boolean;
  readonly: boolean;
  type: any; // numeric, string, date, etc...
}
