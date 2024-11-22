import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';

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
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.translate
          .get('login.toastr.errorMsg')
          .subscribe((errorMessage: string) => {
            this.translate
              .get('login.toastr.errorTitle')
              .pipe(finalize(() => (this.loading = false)))
              .subscribe((errorTitle: string) => {
                this.toastr.error(errorMessage, errorTitle);
              });
          });
        console.error('Login failed:', error);
      },
    });
  }
}
