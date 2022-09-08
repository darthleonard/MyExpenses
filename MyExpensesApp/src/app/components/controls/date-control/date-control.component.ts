import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { FormControlComponent } from '../../form/form-control.component';

@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html'
})
export class DateControlComponent extends FormControlComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('dateTime') dateTime;

  selectedDate: any;

  ngOnInit(): void {
    const datePipe = new DatePipe('en-US');
    this.selectedDate = datePipe.transform(this.form.controls[this.formControltMetadata.key].value, 'MMMM d, y');
    //this.selectedDate = this.form.controls[this.formControltMetadata.key].value;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const datePipe = new DatePipe('en-US');
    this.selectedDate = datePipe.transform(this.dateTime.value, 'MMMM d, y');
    this.modal.dismiss(null, 'confirm');
  }
}
