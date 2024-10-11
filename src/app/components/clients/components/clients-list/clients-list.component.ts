import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface ClienteData {
  id: string;
  fecha: string;
  servicios: string;
  empresa: string;
  estado: string;
}

const ELEMENT_DATA: ClienteData[] = [
  {
    id: '00000',
    fecha: '03/09/2022',
    servicios: 'Lorem ipsum dolor sit amet...',
    empresa: 'Lorem ipsum dolor sit amet...',
    estado: 'Activo',
  },
  {
    id: '00001',
    fecha: '03/09/2022',
    servicios: 'Lorem ipsum dolor sit amet...',
    empresa: 'Lorem ipsum dolor sit amet...',
    estado: 'Inactivo',
  },
  {
    id: '00002',
    fecha: '03/09/2022',
    servicios: 'Lorem ipsum dolor sit amet...',
    empresa: 'Lorem ipsum dolor sit amet...',
    estado: 'Activo',
  },
  {
    id: '00003',
    fecha: '03/09/2022',
    servicios: 'Lorem ipsum dolor sit amet...',
    empresa: 'Lorem ipsum dolor sit amet...',
    estado: 'Inactivo',
  },
  {
    id: '00004',
    fecha: '03/09/2022',
    servicios: 'Lorem ipsum dolor sit amet...',
    empresa: 'Lorem ipsum dolor sit amet...',
    estado: 'Activo',
  },
];

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent {
  displayedColumns: string[] = [
    'id',
    'fecha',
    'servicios',
    'empresa',
    'estado',
    'detalle',
  ];
  dataSource = new MatTableDataSource<ClienteData>(ELEMENT_DATA);
  totalLength = ELEMENT_DATA.length;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Filtering methodos
   */
  clearDate() {
    /**
     * TODO
     */
  }

  clearService() {
    /**
     * TODO
     */
  }

  clearCompany() {
    /**
     * TODO
     */
  }

  clearStatus() {
    /**
     * TODO
     */
  }

  applyFilter(event: Event | string) {
    let filterValue = '';

    if (typeof event === 'string') {
      filterValue = event;
    } else {
      filterValue = (event.target as HTMLInputElement).value;
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
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
