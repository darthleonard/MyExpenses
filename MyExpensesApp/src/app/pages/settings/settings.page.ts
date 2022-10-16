import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public method: string;
  public url: string;
  public port: number;

  constructor() { }

  ngOnInit() {
  }

  onSave() {
    console.log(`${this,this.method}://${this.url}:${this.port}`);
  }
}
