import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe(() => {
      const currentRoute = this.router.url.split('/').pop();
      if (currentRoute) {
        this.selectedTab = currentRoute;
      }
    });
  }

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
