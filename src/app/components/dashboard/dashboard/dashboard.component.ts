import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  // Test Navigation:
  navigationItems = [
    { label: 'Home', icon: 'home', route: '/home' },
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];

  selectedTab: string = 'files';
  isMenuOpened: boolean = true;

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
