import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { Roles } from '../../../../utils/roles.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    this.router.navigate(['/auth/login']);
  }

  getRole(): Roles | null {
    const role = localStorage.getItem('user_role');
    return role ? (role as Roles) : null;
  }

  getInitialRouteByRole(role: Roles): string {
    const roleRoutes: Record<Roles, string> = {
      [Roles.ADMIN]: '/dashboard/clients',
      [Roles.AGENT]: '/dashboard/incidents',
      [Roles.CLIENT]: '/dashboard/users',
      [Roles.USER]: '/auth/login',
    };

    return roleRoutes[role] || '/auth/login';
  }
}
