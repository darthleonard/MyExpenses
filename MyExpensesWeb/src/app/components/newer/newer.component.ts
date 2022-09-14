import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseRecord } from 'src/app/models/expense-record.model';

@Component({
  selector: 'app-newer',
  templateUrl: './newer.component.html',
  styleUrls: ['./newer.component.css']
})
export class NewerComponent implements OnInit {
  forma: FormGroup;
  Expenses = new ExpenseRecord();

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.cargarData();
    this.crearListeners();
  }

  get InvalidPeriod() {
    return this.forma.get('Period').invalid && this.forma.get('Period').touched;
  }

  crearFormulario() {
    let aux = new FormControl('', {
      updateOn: 'submit'
    });

    this.forma = this.fb.group({
      Period: ['', Validators.required],
      Rent: aux,
      PaidTv: [''],
      Water: [''],
      Electricity: [''],
      Gas: [''],
    });
  }

  cargarData() {
    const currentExpense = {
      Period: null,
      Rent: 0,
      PaidTv: 0,
      Water: 0,
      Electricity: 0,
      Gas: 0
    };
    this.forma.setValue(currentExpense);
  }

  crearListeners() {
    this.forma.valueChanges.subscribe(valor => {
      console.log(this.forma.dirty);
    });
  }

  guardar() {
    // call service
    console.log(this.forma);
  }

}
