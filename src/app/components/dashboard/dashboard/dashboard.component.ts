import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private router: Router) {}

  selectedTab: string = 'incidents';
  isMenuOpened: boolean = true;

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.router.navigate([`/dashboard/${tab}`]);
  }

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
