import { AfterViewInit, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';
import { ProfileService } from '../../profile/services/profile.service';
import { ReportsService } from '../service/reports.service';
import { IIssuesList } from 'src/app/models/abcall.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements AfterViewInit {
  companyId = -1;
  issues: any = [];
  issuesStatus = [0, 0, 0];
  ids: any = [];
  responseTimes: any = [];
  channelLabels: any = [];
  channelData: any = [];
  isloading = false;

  constructor(
    private translate: TranslateService,
    private profileService: ProfileService,
    private reportsService: ReportsService,
    private dialog: MatDialog
  ) {}

  getCompanyDetail(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.profileService.getProfile().subscribe({
        next: (userProfile: any) => {
          const companyId = userProfile.data?.company_id;
          this.companyId = companyId;
          resolve(companyId);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  getIssuesByType() {
    this.getCompanyDetail().then((companyId) => {
      this.reportsService.getIssuesByType(companyId.toString()).subscribe({
        next: (issues: IIssuesList) => {
          this.issues = issues.data;

          this.issues.forEach((issue: any) => {
            if (issue.status === 'OPEN') {
              this.issuesStatus[0]++;
            } else if (issue.status === 'SCALED') {
              this.issuesStatus[1]++;
            } else if (issue.status === 'CLOSED') {
              this.issuesStatus[2]++;
            }
          });

          this.ids = this.issues.map((incident: any) => incident.id);
          this.responseTimes = this.issues.map(
            (incident: any) => incident.response_time
          );
        },
      });
    });
  }

  getIssuesBySource() {
    this.getCompanyDetail().then((companyId) => {
      this.reportsService.getIssuesByChannel(companyId.toString()).subscribe({
        next: (issues: any) => {
          const channelData = issues.data;
          this.channelLabels = Object.keys(channelData);
          this.channelData = Object.values(channelData);
          this.renderPieChart();
        },
      });
    });
  }

  renderPieChart() {
    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: this.channelLabels,
        datasets: [
          {
            data: this.channelData,
            backgroundColor: [
              'rgba(153, 102, 255, 0.6)',
              'rgba(128, 128, 128, 0.6)',
              'rgba(50, 205, 50, 0.6)',
              'rgba(0, 0, 255, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }

  ngAfterViewInit(): void {
    this.getIssuesByType();
    this.getIssuesBySource();
    Chart.register(...registerables);

    this.translate
      .get([
        'register.charts.barIncidents.open',
        'register.charts.barIncidents.escalated',
        'register.charts.barIncidents.closed',
        'register.charts.responseTime',
        'register.charts.issuesIdentifiers',
      ])
      .subscribe((translations) => {
        const labels = [
          translations['register.charts.barIncidents.open'],
          translations['register.charts.barIncidents.escalated'],
          translations['register.charts.barIncidents.closed'],
        ];

        const xAxisTitle = translations['register.charts.issuesIdentifiers'];
        const yAxisTitle = translations['register.charts.responseTime'];

        setTimeout(() => {
          new Chart('myChart', {
            type: 'bar',
            data: {
              labels,
              datasets: [
                {
                  data: this.issuesStatus,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });

          new Chart('lineChart', {
            type: 'line',
            data: {
              labels: this.ids,
              datasets: [
                {
                  label: yAxisTitle,
                  data: this.responseTimes,
                  backgroundColor: 'rgba(128, 0, 32, 0.8)',
                  borderColor: 'rgba(128, 0, 32, 0.8)',
                  borderWidth: 2,
                  tension: 0.4,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: xAxisTitle,
                  },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: yAxisTitle,
                  },
                },
              },
            },
          });
        }, 1000);
      });
  }

  openIncidentDialog() {
    this.dialog.open(ReportDialogComponent, {
      data: { companyId: this.companyId },
      width: '600px',
    });
  }
}
