import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss'],
})
export class InfoBoxComponent implements OnInit {

  constructor() { }

  @Input() message: string = "message";
  @Input() actionTitle: string;

  @Output() actionClick = new EventEmitter();

  loading: boolean;

  ngOnInit() {}

  onActionClick() {
    this.actionClick.emit();
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }
}
