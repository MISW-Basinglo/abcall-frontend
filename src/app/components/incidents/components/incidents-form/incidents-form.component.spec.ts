import { IncidentsFormComponent } from './incidents-form.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IncidentsService } from '../../services/incidents.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';

describe('IncidentsFormComponent', () => {
  let component: IncidentsFormComponent;
  let dialogRefMock: jest.Mocked<MatDialogRef<IncidentsFormComponent>>;
  let incidentsServiceMock: jest.Mocked<IncidentsService>;
  let toastrMock: jest.Mocked<ToastrService>;
  let translateServiceMock: jest.Mocked<TranslateService>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    dialogRefMock = {
      close: jest.fn(),
    } as unknown as jest.Mocked<MatDialogRef<IncidentsFormComponent>>;

    incidentsServiceMock = {
      createIssue: jest.fn(),
    } as unknown as jest.Mocked<IncidentsService>;

    toastrMock = {
      success: jest.fn(),
      error: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    translateServiceMock = {
      get: jest.fn((key: string) => of(key)),
    } as unknown as jest.Mocked<TranslateService>;

    formBuilder = new FormBuilder();

    component = new IncidentsFormComponent(
      formBuilder,
      dialogRefMock,
      incidentsServiceMock,
      toastrMock,
      translateServiceMock
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.incidentForm).toBeDefined();
    expect(component.incidentForm.controls['user_id'].value).toBe('');
    expect(component.incidentForm.controls['type'].value).toBe('');
    expect(component.incidentForm.controls['description'].value).toBe('');
  });

  it('should close the dialog when closeDialog is called', () => {
    component.closeDialog();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should call incidentsService.createIssue and close the dialog on successful submit', () => {
    component.incidentForm.controls['user_id'].setValue('1');
    component.incidentForm.controls['type'].setValue('REQUEST');
    component.incidentForm.controls['description'].setValue('Test description');

    incidentsServiceMock.createIssue.mockReturnValue(of({}));

    component.submitForm();

    expect(incidentsServiceMock.createIssue).toHaveBeenCalledWith({
      user_id: '1',
      type: 'REQUEST',
      description: 'Test description',
      source: 'WEB',
    });
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  it('should show success toastr on successful submit', () => {
    component.incidentForm.controls['user_id'].setValue('1');
    component.incidentForm.controls['type'].setValue('REQUEST');
    component.incidentForm.controls['description'].setValue('Test description');

    incidentsServiceMock.createIssue.mockReturnValue(of({}));

    component.submitForm();

    expect(translateServiceMock.get).toHaveBeenCalledWith(
      'incidents.form.toastr.success.message'
    );
    expect(translateServiceMock.get).toHaveBeenCalledWith(
      'incidents.form.toastr.success.title'
    );
    expect(toastrMock.success).toHaveBeenCalledWith(
      'incidents.form.toastr.success.message',
      'incidents.form.toastr.success.title'
    );
  });

  it('should show error toastr on failed submit', () => {
    component.incidentForm.controls['user_id'].setValue('1');
    component.incidentForm.controls['type'].setValue('REQUEST');
    component.incidentForm.controls['description'].setValue('Test description');

    incidentsServiceMock.createIssue.mockReturnValue(throwError('Error'));

    component.submitForm();

    expect(translateServiceMock.get).toHaveBeenCalledWith(
      'incidents.form.toastr.error.message'
    );
    expect(translateServiceMock.get).toHaveBeenCalledWith(
      'incidents.form.toastr.error.title'
    );
    expect(toastrMock.error).toHaveBeenCalledWith(
      'incidents.form.toastr.error.message',
      'incidents.form.toastr.error.title'
    );
  });

  it('should not close the dialog when submitForm is called and form is invalid', () => {
    component.incidentForm.controls['user_id'].setValue('');
    component.incidentForm.controls['type'].setValue('');
    component.incidentForm.controls['description'].setValue('');

    component.submitForm();

    expect(incidentsServiceMock.createIssue).not.toHaveBeenCalled();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should limit description to 500 characters', () => {
    const longDescription = 'a'.repeat(501);
    component.incidentForm.controls['description'].setValue(longDescription);

    const descriptionControl = component.descriptionControl;
    expect(descriptionControl?.valid).toBe(false);
    expect(descriptionControl?.errors?.['maxlength']).toBeTruthy();
  });
});
