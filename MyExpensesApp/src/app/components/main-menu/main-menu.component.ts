import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CloudService } from 'src/app/services/cloud.service';
import { MenuOption } from './menu-option';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  constructor(private router: Router) {}

  cloudEnabled: boolean;
  menuOptions = [
    {
      route: 'dashboard',
      icon: 'bar-chart-outline',
      label: 'Dashboard'
    },
    {
      route: 'house',
      icon: 'home-outline',
      label: 'House',
    },
    {
      route: 'fuel',
      icon: 'car-outline',
      label: 'Fuel',
    },
    {
      route: 'shopping',
      icon: 'cart-outline',
      label: 'Shopping',
    },
    {
      route: 'budget',
      icon: 'cash-outline',
      label: 'Budget',
    },
    {
      route: 'sync',
      icon: 'sync-outline',
      label: 'Sync',
    },
    {
      route: 'settings',
      icon: 'settings-outline',
      label: 'Settings',
    }
  ] as MenuOption[];

  onMenuOpen() {
    this.menuOptions.forEach((m) => {
      m.active = this.router.isActive(m.route, false);
    });
  }

  onMenuClose() {
    
  }
}
