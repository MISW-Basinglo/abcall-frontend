import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIncidentData } from 'src/app/models/abcall.interfaces';

@Injectable({
  providedIn: 'root',
})
export class IncidentsService {
  private apiUrl = 'http://127.0.0.1:80';

  constructor(private http: HttpClient) {}

  getIncidents(): Observable<any> {
    const token = localStorage.getItem('access_token');
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/issues_management`, {
      headers,
    });
  }
}
