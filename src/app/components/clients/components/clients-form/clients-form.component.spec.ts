import { ClientsFormComponent } from './clients-form.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IClientData } from 'src/app/models/abcall.interfaces';
import { ClientsService } from '../../services/clients.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { UsersService } from 'src/app/components/users/services/users.service';

describe('ClientsFormComponent', () => {
  let component: ClientsFormComponent;
  let dialogRefMock: Partial<MatDialogRef<ClientsFormComponent>>;
  let clientsServiceMock: Partial<ClientsService>;
  let toastrServiceMock: Partial<ToastrService>;
  let translateServiceMock: Partial<TranslateService>;
  let formBuilder: FormBuilder;
  let usersServiceMock: Partial<UsersService>;
  let mockClientData: IClientData | null;

  beforeEach(() => {
    dialogRefMock = { close: jest.fn() };
    clientsServiceMock = { createClient: jest.fn().mockReturnValue(of({})) };
    usersServiceMock = { updateCompany: jest.fn().mockReturnValue(of({})) };
    toastrServiceMock = { success: jest.fn(), error: jest.fn() };
    translateServiceMock = { get: jest.fn((key) => of(key)) };
    formBuilder = new FormBuilder();

    mockClientData = {
      created_at: '2024-01-01T08:00:00Z',
      updated_at: '2024-10-20T08:00:00Z',
      id: '1',
      name: 'Test Company',
      nit: '1234567890',
      plan: 'BUSINESS',
      responsible_dni: '9876543210',
      responsible_email: 'john.doe@example.com',
      responsible_name: 'John Doe',
      responsible_phone: '123456789',
      services: 'Chatbot',
      status: 'ACTIVE',
    };

    component = new ClientsFormComponent(
      formBuilder,
      dialogRefMock as MatDialogRef<ClientsFormComponent>,
      mockClientData, // Pasa mockClientData aquí para pruebas de edición
      clientsServiceMock as ClientsService,
      toastrServiceMock as ToastrService,
      usersServiceMock as UsersService,
      translateServiceMock as TranslateService
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with provided clientData', () => {
    component.ngOnInit();
    expect(component.clientsForm.controls['company_name'].value).toBe(
      'Test Company'
    );
    expect(component.clientsForm.controls['user_name'].value).toBe('John Doe');
    expect(component.clientsForm.controls['phone'].value).toBe('123456789');
    expect(component.clientsForm.controls['email'].value).toBe(
      'john.doe@example.com'
    );
    expect(component.clientsForm.controls['plan'].value).toBe('BUSINESS');
  });

  it('should initialize the form with empty controls if no clientData is provided', () => {
    component = new ClientsFormComponent(
      formBuilder,
      dialogRefMock as MatDialogRef<ClientsFormComponent>,
      null,
      clientsServiceMock as ClientsService,
      toastrServiceMock as ToastrService,
      usersServiceMock as UsersService,
      translateServiceMock as TranslateService
    );
    component.ngOnInit();
    expect(component.clientsForm.controls['company_name'].value).toBe('');
    expect(component.clientsForm.controls['user_name'].value).toBe('');
    expect(component.clientsForm.controls['phone'].value).toBe('');
    expect(component.clientsForm.controls['email'].value).toBe('');
    expect(component.clientsForm.controls['plan'].value).toBe('');
  });

  it('should not close the dialog when submitForm is called and form is invalid', () => {
    component.submitForm();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should call createClient on valid form submission', () => {
    component = new ClientsFormComponent(
      formBuilder,
      dialogRefMock as MatDialogRef<ClientsFormComponent>,
      null,
      clientsServiceMock as ClientsService,
      toastrServiceMock as ToastrService,
      usersServiceMock as UsersService,
      translateServiceMock as TranslateService
    );
    component.ngOnInit();
    component.clientsForm.setValue({
      company_name: 'Valid Company',
      nit: '1234567890',
      user_name: 'Valid User',
      phone: '1234567890',
      email: 'valid@example.com',
      plan: 'BUSINESS',
    });
    component.submitForm();
    expect(clientsServiceMock.createClient).toHaveBeenCalledWith(
      component.clientsForm.value
    );
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
