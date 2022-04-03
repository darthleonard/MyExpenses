import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component implements OnInit, AfterViewInit {
  @ViewChild(FormComponent) form: FormComponent;
  Expenses = [];
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.Expenses.push({Period: 0, Rent: 0, PaidTv: 0, Water: 0, Electricity: 0, Gas: 0, Total: 0});
    this.Expenses.push({Period: 0, Rent: 0, PaidTv: 0, Water: 0, Electricity: 0, Gas: 0, Total: 0});
    this.Expenses.push({Period: 0, Rent: 0, PaidTv: 0, Water: 0, Electricity: 0, Gas: 0, Total: 0});
    this.Expenses.push({Period: 0, Rent: 0, PaidTv: 0, Water: 0, Electricity: 0, Gas: 0, Total: 0});
    this.Expenses.push({Period: 0, Rent: 0, PaidTv: 0, Water: 0, Electricity: 0, Gas: 0, Total: 0});
  }

  ngAfterViewInit(): void {
    const metadata = {
      Period: ['', Validators.required],
      Rent: [''],
      PaidTv: [''],
      Water: [''],
      Electricity: [''],
      Gas: [''],
    }


    const entity = {
      nombre: 'nom', apellido: 'ape', correo: 'a@c'
    };
    //this.form.createForm(entity);
    this.testControls();
    this.cd.detectChanges();

  }

  testControls() {
    const controls = [
      {
        fieldName: "period1",
        displayName: "Period 1",
        required: Validators.required,
        validatorsAsync: null,
        visible: true,
        readonly: false,
        type: "FomrDataType.ShortDate or something like that" // numeric, string, date, etc...
      },
      {
        fieldName: "period2",
        displayName: "Period 2",
        required: Validators.required,
        validatorsAsync: null,
        visible: true,
        readonly: false,
        type: "FomrDataType.ShortDate or something like that" // numeric, string, date, etc...
      },
      {
        fieldName: "period3",
        displayName: "Period 3",
        required: Validators.required,
        validatorsAsync: null,
        visible: true,
        readonly: false,
        type: "FomrDataType.ShortDate or something like that" // numeric, string, date, etc...
      }
    ];
    this.form.createFormFromControls(controls);
  }

}
