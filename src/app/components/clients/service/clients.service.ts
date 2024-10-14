import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IClientData } from 'src/app/models/client.interface';
import { generateClients } from 'src/app/utils/abcall.mocks';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  getClients(): Observable<IClientData[]> {
    const clients = generateClients();
    return of(clients);
  }
}
