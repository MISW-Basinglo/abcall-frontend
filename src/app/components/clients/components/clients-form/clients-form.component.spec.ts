import { ClientsFormComponent } from './clients-form.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IClientData } from 'src/app/models/abcall.interfaces';

describe('ClientsFormComponent', () => {
  let component: ClientsFormComponent;
  let dialogRefMock: jest.Mocked<MatDialogRef<ClientsFormComponent>>;
  let formBuilder: FormBuilder;
  let mockClientData: IClientData | null;

  beforeEach(() => {
    dialogRefMock = {
      close: jest.fn(),
    } as unknown as jest.Mocked<MatDialogRef<ClientsFormComponent>>;

    formBuilder = new FormBuilder();

    mockClientData = {
      id: '1',
      clientId: '2',
      company: 'Test Company',
      responsible: 'John Doe',
      phone: '123456789',
      email: 'test@example.com',
      plan: 'BUSINESS',
      date: '2024-10-20',
      services: 'Chatbot',
      status: 'active',
    };

    component = new ClientsFormComponent(
      formBuilder,
      dialogRefMock,
      mockClientData
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with provided clientData', () => {
    component.ngOnInit();
    expect(component.clientsForm).toBeDefined();
    expect(component.clientsForm.controls['company'].value).toBe(
      'Test Company'
    );
    expect(component.clientsForm.controls['responsible'].value).toBe(
      'John Doe'
    );
    expect(component.clientsForm.controls['phone'].value).toBe('123456789');
    expect(component.clientsForm.controls['email'].value).toBe(
      'test@example.com'
    );
    expect(component.clientsForm.controls['plan'].value).toBe('BUSINESS');
  });

  it('should initialize the form with empty controls if no clientData is provided', () => {
    component = new ClientsFormComponent(
      formBuilder,
      dialogRefMock,
      null as any
    );
    component.ngOnInit();
    expect(component.clientsForm).toBeDefined();
    expect(component.clientsForm.controls['company'].value).toBe('');
    expect(component.clientsForm.controls['responsible'].value).toBe('');
    expect(component.clientsForm.controls['phone'].value).toBe('');
    expect(component.clientsForm.controls['email'].value).toBe('');
    expect(component.clientsForm.controls['plan'].value).toBe('');
  });

  it('should close the dialog when closeDialog is called', () => {
    component.closeDialog();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should not close the dialog when submitForm is called and form is invalid', () => {
    component.submitForm();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });
});
