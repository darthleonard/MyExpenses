import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  forma: FormGroup;
  controls: any;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    const aux = {
      nombre: 'a', apellido: 'b', correo: 'c'
    };

    var formControl = {};

    this.controls = Object.keys(aux);
    this.controls.forEach(p => formControl[p] = ['', Validators.required]);

    console.log(formControl);

    this.forma = this.fb.group(formControl);
  }

  guardar() {
    console.log(this.forma);
  }
}

interface FormControl {
  fieldName: string;
  validatorsSync: string;
  validatorsAsync: string;
}

type SomeRecord = {
  nombre: string;
  apellido: number;
  correo: string;
}