import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientsService } from '../../services/clients.service';
import { IClientData } from 'src/app/models/abcall.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ClientsFormComponent } from '../clients-form/clients-form.component';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {
  displayedColumns: string[] = [
    'clientId',
    'date',
    'services',
    'company',
    'status',
    'detalle',
  ];

  dataSource = new MatTableDataSource<IClientData>([]);
  totalLength = 0;

  filterValues: any = {
    clientId: '',
    date: '',
    services: '',
    company: '',
    status: '',
  };

  client: IClientData | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientService: ClientsService,
    private dialog: MatDialog
  ) {}

  openFormDialog(client?: IClientData) {
    const dialogRef = this.dialog.open(ClientsFormComponent, {
      width: '400px',
      data: client || {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getClientsList();
      }
    });
  }

  ngOnInit() {
    this.getClientsList();
    this.dataSource.filterPredicate = this.createFilter();
  }

  getClientsList() {
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.dataSource.data = clients;
        this.totalLength = clients.length;
        this.dataSource.paginator = this.paginator;

        if (this.dataSource.paginator) {
          this.dataSource.paginator.pageSize = 30;
        }

        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error al obtener los clientes', err);
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

  createFilter(): (data: IClientData, filter: string) => boolean {
    return (data: IClientData, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return (
        data.clientId.toLowerCase().includes(searchTerms.clientId) &&
        data.date.toLowerCase().includes(searchTerms.date) &&
        data.services.toLowerCase().includes(searchTerms.services) &&
        data.company.toLowerCase().includes(searchTerms.company) &&
        data.status.toLowerCase().includes(searchTerms.status)
      );
    };
  }

  clearDate() {
    this.applyFilter('', 'date');
  }

  clearService() {
    this.applyFilter('', 'services');
  }

  clearCompany() {
    this.applyFilter('', 'company');
  }

  clearStatus() {
    this.applyFilter('', 'status');
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      default:
        return '';
    }
  }

  getClientToEdit(client: IClientData) {
    this.openFormDialog(client);
  }
}
