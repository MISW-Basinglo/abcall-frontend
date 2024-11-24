import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IncidentsService } from '../../incidents/services/incidents.service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss'],
})
export class ReportDialogComponent implements OnInit {
  incidentReport = '';
  constructor(
    private incidentsService: IncidentsService,
    @Inject(MAT_DIALOG_DATA)
    public data: { companyId: any }
  ) {}

  ngOnInit(): void {
    this.getIncidentsReportsWithAI();
  }

  getIncidentsReportsWithAI() {
    this.incidentsService.AIIncidentReport(this.data.companyId).subscribe({
      next: (AIIncidentReport: any) => {
        this.incidentReport = AIIncidentReport?.text || '';
      },
      error: () => {
        this.incidentReport = '';
      },
    });
  }
}
