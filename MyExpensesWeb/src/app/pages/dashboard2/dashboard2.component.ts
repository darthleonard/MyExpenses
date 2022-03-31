import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component implements OnInit {
  Expenses = [];
  constructor() { }

  ngOnInit(): void {
    this.Expenses.push({Period: 0, Rent: 0, PaidTv: 0, Water: 0, Electricity: 0, Gas: 0, Total: 0});
    this.Expenses.push({Period: 0, Rent: 0, PaidTv: 0, Water: 0, Electricity: 0, Gas: 0, Total: 0});
    this.Expenses.push({Period: 0, Rent: 0, PaidTv: 0, Water: 0, Electricity: 0, Gas: 0, Total: 0});
    this.Expenses.push({Period: 0, Rent: 0, PaidTv: 0, Water: 0, Electricity: 0, Gas: 0, Total: 0});
    this.Expenses.push({Period: 0, Rent: 0, PaidTv: 0, Water: 0, Electricity: 0, Gas: 0, Total: 0});
  }

}
