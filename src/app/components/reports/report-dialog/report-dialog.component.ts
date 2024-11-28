import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IncidentsService } from '../../incidents/services/incidents.service';
import { finalize, pipe } from 'rxjs';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss'],
})
export class ReportDialogComponent implements OnInit {
  incidentReport = '';
  isloading = false;
  constructor(
    private incidentsService: IncidentsService,
    @Inject(MAT_DIALOG_DATA)
    public data: { companyId: any }
  ) {}

  ngOnInit(): void {
    this.getIncidentsReportsWithAI();
  }

  getIncidentsReportsWithAI() {
    this.isloading = true;
    this.incidentsService
      .AIIncidentReport(this.data.companyId)
      .pipe(finalize(() => (this.isloading = false)))
      .subscribe({
        next: (AIIncidentReport: any) => {
          this.incidentReport = AIIncidentReport?.text || '';
        },
        error: () => {
          this.incidentReport = '';
        },
      });
  }
}
