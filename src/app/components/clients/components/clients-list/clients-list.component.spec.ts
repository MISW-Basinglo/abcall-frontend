import { ClientsListComponent } from './clients-list.component';
import { of } from 'rxjs';
import { IClientData } from 'src/app/models/abcall.interfaces';
import { UsersService } from 'src/app/components/users/services/users.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

describe('ClientsListComponent', () => {
  let component: ClientsListComponent;
  let usersServiceMock: Partial<UsersService>;
  let dialogMock: Partial<MatDialog>;
  let dialogRefMock: Partial<MatDialogRef<any>>;

  beforeEach(() => {
    usersServiceMock = {
      getCompanies: jest.fn().mockReturnValue(of({ data: [] })),
      getCompanyById: jest.fn().mockReturnValue(of({ data: {} })),
    };

    dialogRefMock = {
      afterClosed: jest.fn().mockReturnValue(of('closed')),
      close: jest.fn(),
    };

    dialogMock = {
      open: jest.fn().mockReturnValue(dialogRefMock as MatDialogRef<any>),
    };

    component = new ClientsListComponent(
      dialogMock as MatDialog,
      usersServiceMock as UsersService
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component and call getCompaniesClients', () => {
    const mockCompanies: IClientData[] = [
      {
        id: '1234',
        created_at: '2022-01-01',
        services: 'Service1',
        name: 'Company1',
        status: 'ACTIVE',
        updated_at: '',
      },
      {
        id: '5678',
        created_at: '2022-01-02',
        services: 'Service2',
        name: 'Company2',
        status: 'INACTIVE',
        updated_at: '',
      },
    ];

    (usersServiceMock.getCompanies as jest.Mock).mockReturnValue(
      of({ data: mockCompanies })
    );

    component.ngOnInit();

    expect(usersServiceMock.getCompanies).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockCompanies);
    expect(component.totalLength).toBe(mockCompanies.length);
  });

  it('should apply filters correctly', () => {
    const mockEvent = { target: { value: 'test value' } } as unknown as Event;
    component.applyFilter(mockEvent, 'id');

    expect(component.filterValues['id']).toBe('test value');
    expect(component.dataSource.filter).toBe(
      JSON.stringify(component.filterValues)
    );
  });

  it('should clear filters correctly', () => {
    component.clearDate();
    expect(component.filterValues['created_at']).toBe('');

    component.clearService();
    expect(component.filterValues['services']).toBe('');

    component.clearCompany();
    expect(component.filterValues['name']).toBe('');

    component.clearStatus();
    expect(component.filterValues['status']).toBe('');
  });

  it('should return the correct class for status', () => {
    expect(component.getStatusClass('ACTIVE')).toBe('status-active');
    expect(component.getStatusClass('INACTIVE')).toBe('status-inactive');
    expect(component.getStatusClass('Unknown')).toBe('');
  });

  it('should open a dialog when openFormDialog is called', () => {
    component.openFormDialog();

    expect(dialogMock.open).toHaveBeenCalled();
    expect(dialogRefMock.afterClosed).toHaveBeenCalled();
  });
});
