import { Component, Input, OnInit } from '@angular/core';
import { ExpenseRecord } from 'src/app/models/expense-record.model';
import { ConsumptionService } from 'src/app/services/consumption.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit {
  @Input() Expenses: ExpenseRecord[] = [];
  
  displayedColumns: string[] = ['Date', 'Rent', 'PaidTv', 'Water', 'Electricity', 'Gas', 'Total'];

  constructor() { }

  ngOnInit(): void {
    
  }

  onRecordClick(record: ExpenseRecord) {
    console.log(record);
  }

}
