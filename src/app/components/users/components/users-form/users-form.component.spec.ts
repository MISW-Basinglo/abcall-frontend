import { UsersFormComponent } from './users-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ClientsService } from 'src/app/components/clients/services/clients.service';
import { of } from 'rxjs';

describe('UsersFormComponent', () => {
  let component: UsersFormComponent;
  let dialogRefMock: Partial<MatDialogRef<UsersFormComponent>>;
  let toastrServiceMock: Partial<ToastrService>;
  let clientsServiceMock: Partial<ClientsService>;
  let translateServiceMock: Partial<TranslateService>;

  beforeEach(() => {
    dialogRefMock = {
      close: jest.fn(),
    };
    toastrServiceMock = {
      success: jest.fn(),
      error: jest.fn(),
    };
    clientsServiceMock = {
      importUsers: jest.fn().mockReturnValue(of({})),
    };
    translateServiceMock = {
      get: jest.fn().mockReturnValue(of('Mock translation')),
    };

    component = new UsersFormComponent(
      dialogRefMock as MatDialogRef<UsersFormComponent>,
      {} as any,
      toastrServiceMock as ToastrService,
      clientsServiceMock as ClientsService,
      translateServiceMock as TranslateService
    );
  });

  it('should set selectedFile to the dropped file if valid', () => {
    const mockFile = new File([''], 'test.csv', { type: 'text/csv' });
    const mockEvent = {
      preventDefault: jest.fn(),
      dataTransfer: { files: [mockFile] },
    } as unknown as DragEvent;

    component.onFileDropped(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.selectedFile).toEqual(null);
  });

  it('should display an error if the file type is not CSV', () => {
    const mockFile = new File([''], 'test.txt', { type: 'text/plain' });
    const mockEvent = {
      preventDefault: jest.fn(),
      dataTransfer: { files: [mockFile] },
    } as unknown as DragEvent;

    component.onFileDropped(mockEvent);
    expect(toastrServiceMock.error).toHaveBeenCalled();
    expect(component.selectedFile).toBeNull();
  });

  it('should handle file upload and call clientsService.importUsers', () => {
    const mockFile = new File(['content'], 'test.csv', { type: 'text/csv' });
    const base64Content = 'YmFzZTY0ZW5jb2RlZENvbnRlbnQ=';

    component.selectedFile = mockFile;

    const fileReaderMock = {
      readAsDataURL: jest.fn(),
      onload: jest.fn(),
      result: `data:text/csv;base64,${base64Content}`,
    };

    jest
      .spyOn(window, 'FileReader')
      .mockImplementation(() => fileReaderMock as unknown as FileReader);

    component.handleFileUpload();
    fileReaderMock.onload();

    expect(clientsServiceMock.importUsers).toHaveBeenCalledWith({
      users: base64Content,
    });
    expect(toastrServiceMock.success).toHaveBeenCalled();
    expect(dialogRefMock.close).toHaveBeenCalledWith(base64Content);
  });
});
