import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentsService } from '../../services/incidents.service';
import { UsersService } from 'src/app/components/users/services/users.service';
import { ClientsService } from 'src/app/components/clients/services/clients.service';
import { IPhoneHistory } from 'src/app/models/abcall.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { HistoryDialogComponent } from '../history-dialog/history-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.scss'],
})
export class IncidentDetailComponent implements OnInit {
  statusList = [
    { value: 'OPEN', label: 'incidents.list.issueStatus.OPEN' },
    { value: 'SCALED', label: 'incidents.list.issueStatus.SCALED' },
    { value: 'CLOSED', label: 'incidents.list.issueStatus.CLOSED' },
  ];

  incidentId: string | null = null;
  incident: any = {};
  user: any = {};
  userId: number = -1;
  userImportance: number = -1;
  listOfCalls: IPhoneHistory[] = [];
  DEFINITION = '1080px';

  showDescription = false;
  status = '';
  description: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private incidentsService: IncidentsService,
    private usersService: UsersService,
    private clientsService: ClientsService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.incidentId = this.route.snapshot.paramMap.get('id');
    this.loadIncidentDetail();
  }

  openHistoryDialog(): void {
    this.dialog.open(HistoryDialogComponent, {
      width: this.DEFINITION,
      data: this.listOfCalls,
    });
  }

  onStatusChange(status: string): void {
    this.status = status;
    this.showDescription = true;
  }

  loadIncidentDetail() {
    this.incidentsService.getIssueById(Number(this.incidentId)).subscribe({
      next: (issue: any) => {
        this.incident = issue.data;
        this.userId = this.incident.user_id;

        if (this.incident.company_id) {
          this.getUserDetail(this.incident.company_id);
        }

        if (this.incident.user_id) {
          this.getUserImportance(this.incident.user_id);
          this.getListOfCalls(this.incident.user_id);
        }
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  getUserDetail(id: number) {
    this.usersService.getCompanyById(id).subscribe({
      next: (company: any) => {
        this.user = company.data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getUserImportance(userId: number) {
    this.clientsService.getUser(userId).subscribe({
      next: (user) => {
        this.userImportance = user.data.importance
          ? user.data.importance
          : '---';
      },
    });
  }

  getListOfCalls(userId: number) {
    this.incidentsService.getListOfCalls(userId).subscribe({
      next: (listOfCalls) => {
        this.listOfCalls = listOfCalls.data;
      },
    });
  }

  goBackToList(): void {
    this.router.navigate(['/dashboard/incidents']);
  }

  updateIssueStatus() {
    const idToUpdate = this.incidentId ?? '';
    const payload = {
      status: this.status,
      solution: this.description,
    };
    this.incidentsService.updateIssueStatus(idToUpdate, payload).subscribe({
      next: () => {
        this.translate
          .get('incidents.list.detail.incidentDetail.toastr.successMessage')
          .pipe(finalize(() => (this.showDescription = false)))
          .subscribe((errorMessage: string) => {
            this.translate
              .get('incidents.list.detail.incidentDetail.toastr.successTitle')
              .subscribe((errorTitle: string) => {
                this.toastr.success(errorMessage, errorTitle);
              });
          });
      },
      error: () => {
        this.translate
          .get('incidents.list.detail.incidentDetail.toastr.errorMessage')
          .subscribe((errorMessage: string) => {
            this.translate
              .get('incidents.list.detail.incidentDetail.toastr.errorTitle')
              .subscribe((errorTitle: string) => {
                this.toastr.error(errorMessage, errorTitle);
              });
          });
      },
    });
  }
}
