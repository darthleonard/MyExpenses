import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  private suscription: Subscription;

  constructor(private connectivityService: CloudService) {}

  cloudEnabled: boolean;

  onMenuOpen() {
    this.suscription = this.connectivityService.cloudEnabled$.subscribe(
      (r) => (this.cloudEnabled = r)
    );
  }

  onMenuClose() {
    this.suscription.unsubscribe();
  }
}
