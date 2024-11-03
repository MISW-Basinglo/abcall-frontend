import {
  HistoryDialogComponent,
  HistoryData,
} from './history-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

describe('HistoryDialogComponent', () => {
  let component: HistoryDialogComponent;
  let mockDialogRef: Partial<MatDialogRef<HistoryDialogComponent>>;
  const mockData: HistoryData[] = [
    {
      company_id: 1,
      created_at: '2024-09-28T13:00:00Z',
      description: 'Test description',
      id: 123,
      solution: 'Test solution',
      source: 'CALL',
      status: 'CLOSED',
      type: 'PRAISE',
      updated_at: '2024-09-29T10:30:00Z',
      user_id: 10,
    },
  ];

  beforeEach(() => {
    mockDialogRef = {
      close: jest.fn(),
    };

    component = new HistoryDialogComponent(
      mockDialogRef as MatDialogRef<HistoryDialogComponent>,
      mockData
    );
  });

  it('should initialize displayedColumns correctly', () => {
    expect(component.displayedColumns).toEqual([
      'company_id',
      'created_at',
      'description',
      'id',
      'solution',
      'source',
      'status',
      'type',
      'updated_at',
      'user_id',
    ]);
  });

  it('should set dataSource with provided data', () => {
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.dataSource.data).toEqual(mockData);
  });

  it('should call close method on dialogRef when close is invoked', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
