// history-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

export interface HistoryData {
  company_id: number;
  created_at: string;
  description: string;
  id: number;
  solution: string;
  source: string;
  status: string;
  type: string;
  updated_at: string;
  user_id: number;
}

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
})
export class HistoryDialogComponent {
  displayedColumns: string[] = [
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
  ];
  dataSource = new MatTableDataSource<HistoryData>(this.data);

  constructor(
    public dialogRef: MatDialogRef<HistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HistoryData[]
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
