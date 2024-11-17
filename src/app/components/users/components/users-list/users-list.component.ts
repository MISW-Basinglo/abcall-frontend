import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersFormComponent } from '../users-form/users-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { IUserData } from 'src/app/models/abcall.interfaces';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  constructor(private dialog: MatDialog, private usersService: UsersService) {}

  displayedColumns: string[] = [
    'name',
    'phone',
    'channel',
    'dni',
    'importance',
  ];
  dataSource = new MatTableDataSource<IUserData>([]);
  totalLength = 0;

  ngOnInit(): void {
    this.getUsersByCompany();
  }

  openFileUploadDialog() {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsersByCompany();
      }
    });
  }

  getUsersByCompany() {
    this.usersService.getUserByCompany().subscribe((resp: any) => {
      const filteredData = resp.data.map((user: any) => ({
        name: user.name,
        phone: user.phone,
        channel: user.channel,
        dni: user.dni,
        importance: user.importance,
      }));

      this.dataSource.data = filteredData;
      this.totalLength = filteredData.length;
    });
  }
}
