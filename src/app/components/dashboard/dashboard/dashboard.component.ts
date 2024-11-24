import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../auth/services/auth/auth.service';
import { PermissionValidatorService } from '../../auth/services/auth/permission-validator.service';

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
    private translate: TranslateService,
    private authService: AuthService,
    private permissionValidator: PermissionValidatorService
  ) {
    this.currentLang = this.translate.currentLang || 'es';
  }

  ngOnInit() {
    const role = this.authService.getRole();
    if (role) {
      this.permissionValidator.setRole(role);
    } else {
      this.router.navigate(['/auth/login']);
    }

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

  hasAccess(section: string): boolean {
    return this.permissionValidator.hasAccess(section);
  }

  onLogout() {
    console.log('entra')
    this.authService.logout();
  }
}
