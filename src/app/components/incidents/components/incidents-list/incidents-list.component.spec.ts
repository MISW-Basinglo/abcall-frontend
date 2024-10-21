import { IncidentsListComponent } from './incidents-list.component';
import { of } from 'rxjs';
import { IIncidentData } from 'src/app/models/abcall.interfaces';
import { IncidentsFormComponent } from '../incidents-form/incidents-form.component';

describe('IncidentsListComponent', () => {
  let component: IncidentsListComponent;
  let incidentsServiceMock: any;
  let dialogMock: any;

  beforeEach(() => {
    incidentsServiceMock = {
      getIncidents: jest.fn(),
    };

    dialogMock = {
      open: jest.fn(() => ({
        afterClosed: () => of('closed'),
      })),
    };

    component = new IncidentsListComponent(incidentsServiceMock, dialogMock);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component and call getIssuesList', () => {
    const mockIncidents: IIncidentData[] = [
      {
        id: '1234',
        incidentId: '1',
        date: '2022-01-01',
        description: 'Incident 1',
        company: 'Company 1',
        status: 'open',
      },
      {
        id: '5678',
        incidentId: '2',
        date: '2022-01-02',
        description: 'Incident 2',
        company: 'Company 2',
        status: 'escalated',
      },
    ];

    incidentsServiceMock.getIncidents.mockReturnValue(of(mockIncidents));

    component.ngOnInit();

    expect(incidentsServiceMock.getIncidents).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockIncidents);
    expect(component.totalLength).toBe(mockIncidents.length);
  });

  it('should apply filters correctly', () => {
    const mockEvent = { target: { value: 'test value' } } as unknown as Event;

    component.applyFilter(mockEvent, 'incidentId');

    expect(component.filterValues['incidentId']).toBe('test value');
    expect(component.dataSource.filter).toBe(
      JSON.stringify(component.filterValues)
    );
  });

  it('should clear filters correctly', () => {
    component.clearDate();
    expect(component.filterValues['date']).toBe('');

    component.clearService();
    expect(component.filterValues['description']).toBe('');

    component.clearCompany();
    expect(component.filterValues['company']).toBe('');

    component.clearStatus();
    expect(component.filterValues['status']).toBe('');
  });

  it('should return the correct class for status', () => {
    expect(component.getStatusClass('open')).toBe('status-open');
    expect(component.getStatusClass('escalated')).toBe('status-escalated');
    expect(component.getStatusClass('closed')).toBe('status-closed');
    expect(component.getStatusClass('Unknown')).toBe('');
  });

  it('should open a dialog when openFormDialog is called', () => {
    component.openFormDialog();

    expect(dialogMock.open).toHaveBeenCalledWith(IncidentsFormComponent, {
      width: '400px',
    });
  });
});
