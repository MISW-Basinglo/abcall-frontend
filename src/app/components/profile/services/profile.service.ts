import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfileData } from 'src/app/models/abcall.interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<IProfileData> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const params = new HttpParams().set('scope', 'me');
    return this.http.get<IProfileData>(`${this.apiUrl}/user`, {
      headers,
      params,
    });
  }

  updateProfile(userId: number, clientProfile: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.patch<any>(
      `${this.apiUrl}/user/${userId}`,
      clientProfile,
      {
        headers,
      }
    );
  }
}
