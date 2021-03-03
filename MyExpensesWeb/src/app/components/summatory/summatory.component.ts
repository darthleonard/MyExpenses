import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summatory',
  templateUrl: './summatory.component.html',
  styleUrls: ['./summatory.component.css']
})
export class SummatoryComponent implements OnInit {
  @Input() Totals = [];

  constructor() { }

  ngOnInit(): void {
    
  }

}
