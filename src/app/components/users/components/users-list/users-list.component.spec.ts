import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { UsersListComponent } from './users-list.component';
import { UsersService } from '../../services/users.service';
import { UsersFormComponent } from '../users-form/users-form.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let mockDialog: jest.Mocked<MatDialog>;
  let mockUsersService: jest.Mocked<UsersService>;

  beforeEach(() => {
    mockDialog = {
      open: jest.fn(),
    } as unknown as jest.Mocked<MatDialog>;

    mockUsersService = {
      getUserByCompany: jest.fn(),
    } as unknown as jest.Mocked<UsersService>;

    component = new UsersListComponent(mockDialog, mockUsersService);
  });

  it('should initialize correctly and load users', () => {
    const mockUsers = [
      {
        name: 'John Doe',
        phone: '123456789',
        channel: 'Email',
        dni: 'ABC123',
        importance: 'High',
      },
      {
        name: 'Jane Doe',
        phone: '987654321',
        channel: 'Phone',
        dni: 'XYZ456',
        importance: 'Low',
      },
    ];
    mockUsersService.getUserByCompany.mockReturnValue(of({ data: mockUsers }));
    component.ngOnInit();
    expect(mockUsersService.getUserByCompany).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockUsers);
    expect(component.totalLength).toBe(mockUsers.length);
  });

  it('should open the dialog and reload users after closing it with a result', (done) => {
    const mockDialogRef = {
      afterClosed: jest.fn().mockReturnValue(of(true)),
    };
    mockDialog.open.mockReturnValue(mockDialogRef as any);
    jest.spyOn(component, 'getUsersByCompany');
    component.openFileUploadDialog();
    expect(mockDialog.open).toHaveBeenCalledWith(UsersFormComponent, {
      width: '500px',
    });
    mockDialogRef.afterClosed().subscribe(() => {
      expect(component.getUsersByCompany).toHaveBeenCalled();
      done();
    });
  });

  it('should not call getUsersByCompany if the dialog is closed without a result', (done) => {
    const mockDialogRef = {
      afterClosed: jest.fn().mockReturnValue(of(null)),
    };
    mockDialog.open.mockReturnValue(mockDialogRef as any);
    jest.spyOn(component, 'getUsersByCompany');
    component.openFileUploadDialog();
    expect(mockDialog.open).toHaveBeenCalledWith(UsersFormComponent, {
      width: '500px',
    });
    mockDialogRef.afterClosed().subscribe(() => {
      expect(component.getUsersByCompany).not.toHaveBeenCalled();
      done();
    });
  });
});
