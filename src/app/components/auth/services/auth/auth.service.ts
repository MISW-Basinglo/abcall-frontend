import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:80/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    console.log({body})
    return this.http.post(`${this.apiUrl}/login`, body, { headers });
  }

  refreshToken(refreshToken: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${refreshToken}`,
    });
    return this.http.post(`${this.apiUrl}/refresh`, {}, { headers });
  }

  decodeToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/decode-token`);
  }

  checkHealth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isTokenValid(token: string): Observable<boolean> {
    return this.http
      .post<{ valid: boolean }>('/api/auth/validate-token', { token })
      .pipe(
        map((response) => response.valid),
        catchError(() => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}
