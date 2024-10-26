import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IClientData, IClientToSave } from 'src/app/models/abcall.interfaces';
import { generateClients } from 'src/app/utils/abcall.mocks';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClients(): Observable<IClientData[]> {
    const clients = generateClients();
    return of(clients);
  }

  createClient(client: IClientToSave) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<IClientToSave>(`${this.apiUrl}/user`, client, {
      headers,
    });
  }
}
