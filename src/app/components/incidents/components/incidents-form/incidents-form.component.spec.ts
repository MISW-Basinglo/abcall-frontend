import { IncidentsFormComponent } from './incidents-form.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

describe('IncidentsFormComponent', () => {
  let component: IncidentsFormComponent;
  let dialogRefMock: jest.Mocked<MatDialogRef<IncidentsFormComponent>>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    dialogRefMock = {
      close: jest.fn(),
    } as unknown as jest.Mocked<MatDialogRef<IncidentsFormComponent>>;

    formBuilder = new FormBuilder();

    component = new IncidentsFormComponent(formBuilder, dialogRefMock);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.incidentForm).toBeDefined();
    expect(component.incidentForm.controls['userDni'].value).toBe('');
    expect(component.incidentForm.controls['issueType'].value).toBe('');
    expect(component.incidentForm.controls['incidentDescription'].value).toBe(
      ''
    );
  });

  it('should close the dialog when closeDialog is called', () => {
    component.closeDialog();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should close the dialog with form data when submitForm is called and form is valid', () => {
    component.incidentForm.controls['userDni'].setValue('123456789');
    component.incidentForm.controls['issueType'].setValue('REQUEST');
    component.incidentForm.controls['incidentDescription'].setValue(
      'Test description'
    );

    component.submitForm();

    expect(dialogRefMock.close).toHaveBeenCalledWith({
      userDni: '123456789',
      issueType: 'REQUEST',
      incidentDescription: 'Test description',
    });
  });

  it('should not close the dialog when submitForm is called and form is invalid', () => {
    component.incidentForm.controls['userDni'].setValue('');
    component.incidentForm.controls['issueType'].setValue('');
    component.incidentForm.controls['incidentDescription'].setValue('');

    component.submitForm();

    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should limit description to 500 characters', () => {
    const longDescription = 'a'.repeat(501);
    component.incidentForm.controls['incidentDescription'].setValue(
      longDescription
    );

    const descriptionControl = component.descriptionControl;
    expect(descriptionControl?.valid).toBe(false);
    expect(descriptionControl?.errors?.['maxlength']).toBeTruthy();
  });
});
