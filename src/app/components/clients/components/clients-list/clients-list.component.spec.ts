import { ClientsListComponent } from './clients-list.component';
import { of } from 'rxjs';
import { IClientData } from 'src/app/models/abcall.interfaces';

describe('ClientsListComponent', () => {
  let component: ClientsListComponent;
  let clientServiceMock: any;
  let dialogMock: any;

  beforeEach(() => {
    clientServiceMock = {
      getClients: jest.fn(),
    };

    dialogMock = {
      open: jest.fn(() => ({
        afterClosed: () => of('closed'),
      })),
    };

    component = new ClientsListComponent(clientServiceMock, dialogMock);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component and call getClientsList', () => {
    const mockClients: IClientData[] = [
      {
        id: '1234',
        clientId: '1',
        date: '2022-01-01',
        services: 'Service1',
        company: 'Company1',
        status: 'active',
      },
      {
        id: '5678',
        clientId: '2',
        date: '2022-01-02',
        services: 'Service2',
        company: 'Company2',
        status: 'inactive',
      },
    ];

    clientServiceMock.getClients.mockReturnValue(of(mockClients));
    component.ngOnInit();

    expect(clientServiceMock.getClients).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockClients);
    expect(component.totalLength).toBe(mockClients.length);
  });

  it('should apply filters correctly', () => {
    const mockEvent = { target: { value: 'test value' } } as unknown as Event;
    component.applyFilter(mockEvent, 'clientId');

    expect(component.filterValues['clientId']).toBe('test value');
    expect(component.dataSource.filter).toBe(
      JSON.stringify(component.filterValues)
    );
  });

  it('should clear filters correctly', () => {
    component.clearDate();
    expect(component.filterValues['date']).toBe('');

    component.clearService();
    expect(component.filterValues['services']).toBe('');

    component.clearCompany();
    expect(component.filterValues['company']).toBe('');

    component.clearStatus();
    expect(component.filterValues['status']).toBe('');
  });

  it('should return the correct class for status', () => {
    expect(component.getStatusClass('active')).toBe('status-active');
    expect(component.getStatusClass('inactive')).toBe('status-inactive');
    expect(component.getStatusClass('Unknown')).toBe('');
  });
});
