import { Component, OnInit } from '@angular/core';
import { ExpenseRecord } from 'src/app/models/expense-record.model';
import { Tile } from 'src/app/models/tile.model';
import { ConsumptionService } from 'src/app/services/consumption.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Expenses: ExpenseRecord[] = [];
  Tileset: Tile[] = [];

  constructor(public consumptionService: ConsumptionService) { }

  ngOnInit(): void {
    this.consumptionService.getConsumptions()
      .subscribe(r => {
        this.Expenses = r.records;
        this.calcSummatory();
      });
  }

  calcSummatory() {
    this.Tileset.push(new Tile("Gas", this.Expenses.reduce((sum, current) => sum + Number(current.Gas), 0)));
    this.Tileset.push(new Tile("Rent", this.Expenses.reduce((sum, current) => sum + Number(current.Rent), 0)));
    this.Tileset.push(new Tile("Water", this.Expenses.reduce((sum, current) => sum + Number(current.Water), 0)));
    this.Tileset.push(new Tile("PaidTv", this.Expenses.reduce((sum, current) => sum + Number(current.PaidTv), 0)));
    this.Tileset.push(new Tile("Electricity", this.Expenses.reduce((sum, current) => sum + Number(current.Electricity), 0)));
    this.Tileset.push(new Tile("Fuel", NaN));
  }

  onRecordSelected(record: ExpenseRecord) {
    console.log(record);
  }
}
