import { ClientsListComponent } from './clients-list.component';
import { of } from 'rxjs';
import { IClientData } from 'src/app/models/client.interface';

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
        fecha: '2022-01-01',
        servicios: 'Service1',
        empresa: 'Company1',
        estado: 'Activo',
      },
      {
        id: '5678',
        clientId: '2',
        fecha: '2022-01-02',
        servicios: 'Service2',
        empresa: 'Company2',
        estado: 'Inactivo',
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
    expect(component.filterValues['fecha']).toBe('');

    component.clearService();
    expect(component.filterValues['servicios']).toBe('');

    component.clearCompany();
    expect(component.filterValues['empresa']).toBe('');

    component.clearStatus();
    expect(component.filterValues['estado']).toBe('');
  });

  it('should return the correct class for status', () => {
    expect(component.getStatusClass('Activo')).toBe('status-active');
    expect(component.getStatusClass('Inactivo')).toBe('status-inactive');
    expect(component.getStatusClass('Unknown')).toBe('');
  });
});
