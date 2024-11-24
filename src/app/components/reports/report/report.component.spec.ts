import { ReportComponent } from './report.component';
import { of } from 'rxjs';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let translateServiceMock: any;
  let profileServiceMock: any;
  let reportsServiceMock: any;

  beforeEach(() => {
    translateServiceMock = {
      get: jest.fn().mockReturnValue(
        of({
          'register.charts.barIncidents.open': 'Open',
          'register.charts.barIncidents.escalated': 'Escalated',
          'register.charts.barIncidents.closed': 'Closed',
          'register.charts.responseTime': 'Response Time',
          'register.charts.issuesIdentifiers': 'Issues Identifiers',
        })
      ),
    };

    profileServiceMock = {
      getProfile: jest.fn().mockReturnValue(
        of({
          data: {
            company_id: 123,
          },
        })
      ),
    };

    reportsServiceMock = {
      getIssuesByType: jest.fn().mockReturnValue(
        of({
          data: [
            { status: 'OPEN', id: 1, response_time: 10 },
            { status: 'SCALED', id: 2, response_time: 20 },
            { status: 'CLOSED', id: 3, response_time: 30 },
          ],
        })
      ),
      getIssuesByChannel: jest.fn().mockReturnValue(
        of({
          data: {
            Email: 5,
            Phone: 10,
            Chat: 3,
          },
        })
      ),
    };

    jest.spyOn(document, 'getElementById').mockReturnValue({
      getContext: jest.fn().mockReturnValue({}),
    } as unknown as HTMLCanvasElement);

    component = new ReportComponent(
      translateServiceMock,
      profileServiceMock,
      reportsServiceMock
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch issues by source and render pie chart without errors', async () => {
    await component.getIssuesBySource();
    expect(reportsServiceMock.getIssuesByChannel).toHaveBeenCalledWith('123');
    expect(component.channelLabels).toEqual(['Email', 'Phone', 'Chat']);
    expect(component.channelData).toEqual([5, 10, 3]);
    expect(document.getElementById).toHaveBeenCalledWith('pieChart');
  });
});
