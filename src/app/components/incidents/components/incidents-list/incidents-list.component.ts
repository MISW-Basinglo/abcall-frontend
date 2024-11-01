import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ICompany,
  ICompanyData,
  IIssueData,
} from 'src/app/models/abcall.interfaces';
import { IncidentsService } from '../../services/incidents.service';
import { MatDialog } from '@angular/material/dialog';
import { IncidentsFormComponent } from '../incidents-form/incidents-form.component';
import { UsersService } from 'src/app/components/users/services/users.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incidents-list',
  templateUrl: './incidents-list.component.html',
  styleUrls: ['./incidents-list.component.scss'],
})
export class IncidentsListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'created_at',
    'description',
    'company',
    'status',
    'detail',
  ];

  dataSource = new MatTableDataSource<IIssueData>([]);
  totalLength = 0;

  filterValues: any = {
    id: '',
    created_at: '',
    description: '',
    company: '',
    status: '',
  };
  companiesList: ICompany[] = [];
  SIZE_PAGE = 30;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private incidentsService: IncidentsService,
    private dialog: MatDialog,
    private usersService: UsersService,
    private translate: TranslateService,
    private router: Router
  ) {}

  openFormDialog() {
    const dialogRef = this.dialog.open(IncidentsFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getIssuesList();
      }
    });
  }

  ngOnInit(): void {
    this.getIssuesList();
    this.dataSource.filterPredicate = this.createFilter();
  }

  getIssuesList() {
    this.incidentsService.getIncidents().subscribe({
      next: (incidents) => {
        this.getAllCompanies();

        this.usersService.getCompanies().subscribe({
          next: (companies: ICompanyData) => {
            this.companiesList = companies.data;

            incidents.data.forEach((incident: IIssueData) => {
              const company = this.companiesList.find(
                (c) => c.id === incident.company_id
              );
              if (company) {
                incident['company'] = company.name;
              } else {
                incident['company'] = 'Unknown';
              }
              incident['created_at'] = new Date(incident.created_at)
                .toISOString()
                .split('T')[0];
            });

            this.dataSource.data = incidents.data;
            this.totalLength = incidents.count;
            this.dataSource.paginator = this.paginator;

            if (this.dataSource.paginator) {
              this.dataSource.paginator.pageSize = this.SIZE_PAGE;
            }

            this.dataSource.sort = this.sort;
          },
          error: (err) => {
            console.error(err);
          },
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getAllCompanies() {
    this.usersService.getCompanies().subscribe({
      next: (companies) => {
        this.companiesList = companies.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  applyFilter(event: Event | string, field: string) {
    let filterValue = '';

    if (typeof event === 'string') {
      filterValue = event;
    } else {
      filterValue = (event.target as HTMLInputElement).value;
    }

    this.filterValues[field] = filterValue.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  createFilter(): (data: IIssueData, filter: string) => boolean {
    return (data: IIssueData, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      const translatedStatus = this.translate.instant(
        `incidents.list.issueStatus.${data.status}`
      );

      const issueDate = new Date(data.created_at).toLocaleDateString();

      return (
        data.id
          .toString()
          .toLowerCase()
          .includes(searchTerms.id ?? '') &&
        issueDate.includes(searchTerms.created_at ?? '') &&
        data.description
          ?.toLowerCase()
          .includes(searchTerms.description ?? '') &&
        data.company
          .toLowerCase()
          .includes(searchTerms.company?.toLowerCase() ?? '') &&
        translatedStatus?.toLowerCase().includes(searchTerms.status ?? '') &&
        data.type?.toLowerCase().includes(searchTerms.type ?? '') &&
        data.source?.toLowerCase().includes(searchTerms.source ?? '')
      );
    };
  }

  clearDate() {
    this.applyFilter('', 'created_at');
  }

  clearService() {
    this.applyFilter('', 'description');
  }

  clearCompany() {
    this.applyFilter('', 'company');
  }

  clearStatus() {
    this.applyFilter('', 'status');
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'OPEN':
        return 'status-open';
      case 'SCALED':
        return 'status-escalated';
      case 'CLOSED':
        return 'status-closed';
      default:
        return '';
    }
  }

  navigateToIncidentDetail(incident: IIssueData) {
    this.router.navigate(['dashboard', 'incidents', 'detail', incident.id], {
      state: { incident },
    });
  }
}
