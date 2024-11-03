import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersFormComponent } from '../users-form/users-form.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  constructor(private dialog: MatDialog) {}

  openFileUploadDialog() {
    this.dialog.open(UsersFormComponent, {
      width: '500px',
    });
  }
}
