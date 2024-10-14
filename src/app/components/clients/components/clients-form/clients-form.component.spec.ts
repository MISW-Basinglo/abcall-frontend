import { ClientsFormComponent } from './clients-form.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

describe('ClientsFormComponent', () => {
  let component: ClientsFormComponent;
  let dialogRefMock: jest.Mocked<MatDialogRef<ClientsFormComponent>>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    dialogRefMock = {
      close: jest.fn(),
    } as unknown as jest.Mocked<MatDialogRef<ClientsFormComponent>>;

    formBuilder = new FormBuilder();

    component = new ClientsFormComponent(formBuilder, dialogRefMock);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty controls', () => {
    expect(component.clientsForm).toBeDefined();
    expect(component.clientsForm.controls['nombreEmpresa'].value).toBe('');
    expect(component.clientsForm.controls['nit'].value).toBe('');
    expect(component.clientsForm.controls['responsable'].value).toBe('');
    expect(component.clientsForm.controls['telefono'].value).toBe('');
    expect(component.clientsForm.controls['email'].value).toBe('');
    expect(component.clientsForm.controls['plan'].value).toBe('');
  });

  it('should close the dialog when closeDialog is called', () => {
    component.closeDialog();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should close the dialog with form value when submitForm is called and form is valid', () => {
    component.clientsForm.controls['nombreEmpresa'].setValue('Test Company');
    component.clientsForm.controls['nit'].setValue('12345678');
    component.clientsForm.controls['responsable'].setValue('John Doe');
    component.clientsForm.controls['telefono'].setValue('123456789');
    component.clientsForm.controls['email'].setValue('test@example.com');
    component.clientsForm.controls['plan'].setValue('basic');

    component.submitForm();

    expect(dialogRefMock.close).toHaveBeenCalledWith({
      nombreEmpresa: 'Test Company',
      nit: '12345678',
      responsable: 'John Doe',
      telefono: '123456789',
      email: 'test@example.com',
      plan: 'basic',
    });
  });

  it('should not close the dialog when submitForm is called and form is invalid', () => {
    component.submitForm();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });
});
