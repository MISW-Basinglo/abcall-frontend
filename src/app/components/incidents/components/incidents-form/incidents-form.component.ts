import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientsFormComponent } from 'src/app/components/clients/components/clients-form/clients-form.component';

@Component({
  selector: 'app-incidents-form',
  templateUrl: './incidents-form.component.html',
  styleUrls: ['./incidents-form.component.scss'],
})
export class IncidentsFormComponent {
  incidentForm: FormGroup;

  issueTypes = [
    { value: 'REQUEST', label: 'incidents.form.issueTypes.request' },
    { value: 'COMPLAINT', label: 'incidents.form.issueTypes.complaint' },
    { value: 'CLAIM', label: 'incidents.form.issueTypes.claim' },
    { value: 'SUGGESTION', label: 'incidents.form.issueTypes.suggestion' },
    { value: 'PRAISE', label: 'incidents.form.issueTypes.praise' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<IncidentsFormComponent>
  ) {
    this.incidentForm = this.fb.group({
      userDni: ['', [Validators.required]],
      issueType: ['', [Validators.required]],
      incidentDescription: ['', [Validators.maxLength(500)]],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitForm() {
    if (this.incidentForm.valid) {
      console.log(this.incidentForm.value);
      this.dialogRef.close(this.incidentForm.value);
    }
  }

  get descriptionControl() {
    return this.incidentForm.get('incidentDescription');
  }
}
