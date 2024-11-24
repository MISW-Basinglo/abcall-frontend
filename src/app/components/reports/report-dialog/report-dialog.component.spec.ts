import { ReportDialogComponent } from './report-dialog.component';
import { IncidentsService } from '../../incidents/services/incidents.service';
import { of } from 'rxjs';

describe('ReportDialogComponent', () => {
  let component: ReportDialogComponent;
  let mockIncidentsService: jest.Mocked<IncidentsService>;
  const mockDialogData = { companyId: 123 };

  beforeEach(() => {
    mockIncidentsService = {
      AIIncidentReport: jest.fn(),
    } as unknown as jest.Mocked<IncidentsService>;

    component = new ReportDialogComponent(mockIncidentsService, mockDialogData);
  });

  it('should initialize with empty incidentReport', () => {
    expect(component.incidentReport).toBe('');
  });

  it('should call getIncidentsReportsWithAI on ngOnInit', () => {
    const mockResponse = { text: 'Test incident report' };
    mockIncidentsService.AIIncidentReport.mockReturnValue(of(mockResponse));

    component.ngOnInit();

    expect(mockIncidentsService.AIIncidentReport).toHaveBeenCalledWith(
      mockDialogData.companyId
    );
    expect(component.incidentReport).toBe(mockResponse.text);
  });

  it('should handle an empty response gracefully', () => {
    mockIncidentsService.AIIncidentReport.mockReturnValue(of({}));

    component.getIncidentsReportsWithAI();

    expect(component.incidentReport).toBe('');
    expect(mockIncidentsService.AIIncidentReport).toHaveBeenCalledWith(
      mockDialogData.companyId
    );
  });
});
