import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Roles } from '../../../utils/roles.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  login() {
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        const decodedToken = this.decodeJWT(response.access_token);
        const userRole = decodedToken.role as Roles;

        if (userRole === Roles.USER) {
          this.loading = false;
          this.showError('Invalid credentials');
          return;
        }

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('user_role', userRole);

        const initialRoute = this.authService.getInitialRouteByRole(userRole);
        this.router.navigateByUrl(initialRoute);
        this.loading = false;
      },
      error: () => {
        this.showError('Login failed');
      },
    });
  }

  decodeJWT(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  private showError(message: string) {
    this.translate.get('login.toastr.errorTitle').subscribe((errorTitle) => {
      this.toastr.error(message, errorTitle || 'Error');
      this.loading = false;
    });
  }
}
