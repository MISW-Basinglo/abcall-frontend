import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IClientData } from 'src/app/models/abcall.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ClientsFormComponent } from '../clients-form/clients-form.component';
import { UsersService } from 'src/app/components/users/services/users.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'created_at',
    'services',
    'name',
    'status',
    'detalle',
  ];

  dataSource = new MatTableDataSource<IClientData>([]);
  totalLength = 0;
  companiesList = [];

  filterValues: any = {
    id: '',
    created_at: '',
    services: '',
    name: '',
    status: '',
  };

  client: IClientData | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private usersService: UsersService) {}

  openFormDialog(client?: IClientData) {
    const dialogRef = this.dialog.open(ClientsFormComponent, {
      width: '400px',
      data: client || {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCompaniesClients();
      }
    });
  }

  ngOnInit() {
    this.dataSource.filterPredicate = this.createFilter();
    this.getCompaniesClients();
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
        data.id.toLowerCase().includes(searchTerms.id) &&
        data.created_at.toLowerCase().includes(searchTerms.created_at) &&
        data.services.toLowerCase().includes(searchTerms.services) &&
        data.name.toLowerCase().includes(searchTerms.name) &&
        data.status.toLowerCase().includes(searchTerms.status)
      );
    };
  }

  clearDate() {
    this.applyFilter('', 'created_at');
  }

  clearService() {
    this.applyFilter('', 'services');
  }

  clearCompany() {
    this.applyFilter('', 'name');
  }

  clearStatus() {
    this.applyFilter('', 'status');
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'ACTIVE':
        return 'status-active';
      case 'INACTIVE':
        return 'status-inactive';
      default:
        return '';
    }
  }

  getClientToEdit(client: IClientData) {
    this.openFormDialog(client);
  }

  getCompaniesClients() {
    this.usersService.getCompanies().subscribe({
      next: (companies) => {
        this.companiesList = companies.data;
        this.companiesList.forEach((item: any) => {
          item.services = 'ALL';

          this.getCompanyDetail(item.id).then((companyDetail) => {
            item.responsible_dni = companyDetail.responsible_dni;
            item.responsible_email = companyDetail.responsible_email;
            item.responsible_name = companyDetail.responsible_name;
            item.responsible_phone = companyDetail.responsible_phone;
          });
        });
        this.dataSource.data = this.companiesList;
        this.totalLength = this.companiesList.length;
        this.dataSource.paginator = this.paginator;

        if (this.dataSource.paginator) {
          this.dataSource.paginator.pageSize = 30;
        }

        this.dataSource.sort = this.sort;
        this.sort.active = 'id';
        this.sort.direction = 'asc';
        this.sort.sortChange.emit();
      },
    });
  }

  async getCompanyDetail(companyId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getCompanyById(companyId).subscribe({
        next: (company) => {
          resolve(company.data);
        },
        error: (err) => {
          console.error(err);
          reject(err);
        },
      });
    });
  }
}
