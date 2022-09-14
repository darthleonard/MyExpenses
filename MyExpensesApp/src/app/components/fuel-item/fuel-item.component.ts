import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fuel-item',
  templateUrl: './fuel-item.component.html',
  styleUrls: ['./fuel-item.component.scss'],
})
export class FuelItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  onClick() {
    console.log("click");
  }
}
