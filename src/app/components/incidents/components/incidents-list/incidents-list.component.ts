import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IIncidentData } from 'src/app/models/abcall.interfaces';
import { IncidentsService } from '../../service/incidents.service';
import { MatDialog } from '@angular/material/dialog';
import { IncidentsFormComponent } from '../incidents-form/incidents-form.component';

@Component({
  selector: 'app-incidents-list',
  templateUrl: './incidents-list.component.html',
  styleUrls: ['./incidents-list.component.scss'],
})
export class IncidentsListComponent implements OnInit {
  displayedColumns: string[] = [
    'incidentId',
    'date',
    'description',
    'company',
    'status',
    'detail',
  ];

  dataSource = new MatTableDataSource<IIncidentData>([]);
  totalLength = 0;

  filterValues: any = {
    incidentId: '',
    date: '',
    description: '',
    company: '',
    status: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private incidentsService: IncidentsService,
    private dialog: MatDialog
  ) {}

  openFormDialog() {
    const dialogRef = this.dialog.open(IncidentsFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.getIssuesList();
    this.dataSource.filterPredicate = this.createFilter();
  }

  getIssuesList() {
    this.incidentsService.getIncidents().subscribe({
      next: (incidents) => {
        this.dataSource.data = incidents;
        this.totalLength = incidents.length;
        this.dataSource.paginator = this.paginator;

        if (this.dataSource.paginator) {
          this.dataSource.paginator.pageSize = 30;
        }

        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error al obtener los incidentes', err);
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

  createFilter(): (data: IIncidentData, filter: string) => boolean {
    return (data: IIncidentData, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return (
        data.incidentId.toLowerCase().includes(searchTerms.incidentId) &&
        data.date.toLowerCase().includes(searchTerms.date) &&
        data.description.toLowerCase().includes(searchTerms.description) &&
        data.company.toLowerCase().includes(searchTerms.company) &&
        data.status.toLowerCase().includes(searchTerms.status)
      );
    };
  }

  clearDate() {
    this.applyFilter('', 'date');
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
      case 'open':
        return 'status-open';
      case 'escalated':
        return 'status-escalated';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  }
}
