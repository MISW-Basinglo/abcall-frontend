import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body, { headers });
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return of(null);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${refreshToken}`,
    });
    return this.http.post(`${this.apiUrl}/refresh-token`, {}, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    return !!token;
  }

  handleTokenExpiration(): Observable<boolean> {
    return this.refreshToken().pipe(
      map((response) => {
        if (response && response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
