import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientsService } from '../../service/clients.service';
import { IClientData } from 'src/app/models/client.interface';
import { MatDialog } from '@angular/material/dialog';
import { ClientsFormComponent } from '../clients-form/clients-form.component';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent {
  displayedColumns: string[] = [
    'clientId',
    'fecha',
    'servicios',
    'empresa',
    'estado',
    'detalle',
  ];

  dataSource = new MatTableDataSource<IClientData>([]);
  totalLength = 0;

  filterValues: any = {
    clientId: '',
    fecha: '',
    servicios: '',
    empresa: '',
    estado: '',
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientService: ClientsService,
    private dialog: MatDialog
  ) {}

  openFormDialog() {
    const dialogRef = this.dialog.open(ClientsFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
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
        data.fecha.toLowerCase().includes(searchTerms.fecha) &&
        data.servicios.toLowerCase().includes(searchTerms.servicios) &&
        data.empresa.toLowerCase().includes(searchTerms.empresa) &&
        data.estado.toLowerCase().includes(searchTerms.estado)
      );
    };
  }

  clearDate() {
    this.applyFilter('', 'fecha');
  }

  clearService() {
    this.applyFilter('', 'servicios');
  }

  clearCompany() {
    this.applyFilter('', 'empresa');
  }

  clearStatus() {
    this.applyFilter('', 'estado');
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Activo':
        return 'status-active';
      case 'Inactivo':
        return 'status-inactive';
      default:
        return '';
    }
  }
}
