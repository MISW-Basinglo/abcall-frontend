import { IncidentsListComponent } from './incidents-list.component';
import { of } from 'rxjs';
import { IIssueData } from 'src/app/models/abcall.interfaces';
import { IncidentsFormComponent } from '../incidents-form/incidents-form.component';

describe('IncidentsListComponent', () => {
  let component: IncidentsListComponent;
  let incidentsServiceMock: any;
  let dialogMock: any;
  let usersServiceMock: any;
  let translateServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    incidentsServiceMock = {
      getIncidents: jest.fn(),
    };

    dialogMock = {
      open: jest.fn(() => ({
        afterClosed: () => of('closed'),
      })),
    };

    usersServiceMock = {
      getCompanies: jest.fn().mockReturnValue(of({ data: [] })),
    };

    translateServiceMock = {
      instant: jest.fn().mockReturnValue('translated status'),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    component = new IncidentsListComponent(
      incidentsServiceMock,
      dialogMock,
      usersServiceMock,
      translateServiceMock,
      routerMock
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component and call getIssuesList', () => {
    const mockIncidents: IIssueData[] = [
      {
        id: 1234,
        company_id: 1,
        company: 'Company 1',
        created_at: '2024-10-15T08:15:00Z',
        description: 'Incident 1',
        status: 'OPEN',
        solution: null,
        source: 'WEB',
        type: 'request',
        updated_at: '2024-10-16T08:15:00Z',
        user_id: 1,
      },
      {
        id: 5678,
        company_id: 2,
        company: 'Company 2',
        created_at: '2024-10-16T08:15:00Z',
        description: 'Incident 2',
        status: 'SCALED',
        solution: null,
        source: 'WEB',
        type: 'complaint',
        updated_at: '2024-10-17T08:15:00Z',
        user_id: 2,
      },
    ];

    incidentsServiceMock.getIncidents.mockReturnValue(
      of({ data: mockIncidents, count: mockIncidents.length })
    );

    component.ngOnInit();

    expect(incidentsServiceMock.getIncidents).toHaveBeenCalled();
    expect(usersServiceMock.getCompanies).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockIncidents);
    expect(component.totalLength).toBe(mockIncidents.length);
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
    expect(component.filterValues['description']).toBe('');

    component.clearCompany();
    expect(component.filterValues['company']).toBe('');

    component.clearStatus();
    expect(component.filterValues['status']).toBe('');
  });

  it('should return the correct class for status', () => {
    expect(component.getStatusClass('OPEN')).toBe('status-open');
    expect(component.getStatusClass('SCALED')).toBe('status-escalated');
    expect(component.getStatusClass('CLOSED')).toBe('status-closed');
    expect(component.getStatusClass('Unknown')).toBe('');
  });

  it('should open a dialog when openFormDialog is called', () => {
    component.openFormDialog();

    expect(dialogMock.open).toHaveBeenCalledWith(IncidentsFormComponent, {
      width: '400px',
    });
  });
});
