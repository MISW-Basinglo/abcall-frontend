import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentLang: string | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.currentLang || 'es';
  }

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

  toggleLanguage(event: any) {
    this.currentLang = event.checked ? 'en' : 'es';
    this.translate.use(this.currentLang);
  }
}
