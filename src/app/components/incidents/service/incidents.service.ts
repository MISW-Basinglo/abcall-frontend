import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IIncidentData } from 'src/app/models/abcall.interfaces';
import { generateIncidents } from 'src/app/utils/abcall.mocks';

@Injectable({
  providedIn: 'root',
})
export class IncidentsService {
  getIncidents(): Observable<IIncidentData[]> {
    const incidents = generateIncidents();
    return of(incidents);
  }
}
