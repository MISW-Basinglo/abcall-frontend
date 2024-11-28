import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IncidentsService } from '../../services/incidents.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-incidents-form',
  templateUrl: './incidents-form.component.html',
  styleUrls: ['./incidents-form.component.scss'],
})
export class IncidentsFormComponent {
  incidentForm: FormGroup;
  showSuggestion = false;
  aiSuggestion = '';
  isLoading = false;

  issueTypes = [
    { value: 'REQUEST', label: 'incidents.form.issueTypes.request' },
    { value: 'COMPLAINT', label: 'incidents.form.issueTypes.complaint' },
    { value: 'CLAIM', label: 'incidents.form.issueTypes.claim' },
    { value: 'SUGGESTION', label: 'incidents.form.issueTypes.suggestion' },
    { value: 'PRAISE', label: 'incidents.form.issueTypes.praise' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<IncidentsFormComponent>,
    private incidentsService: IncidentsService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.incidentForm = this.fb.group({
      dni: ['', [Validators.required]],
      type: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      source: ['WEB'],
    });
  }

  closeDialog() {
    this.dialogRef.close();
    this.showSuggestion = false;
  }

  submitForm() {
    if (this.incidentForm.valid) {
      const issue = this.incidentForm.value;
      this.incidentsService
        .createIssue(issue)
        .pipe(
          finalize(() => {
            this.dialogRef.close(true);
          })
        )
        .subscribe({
          next: () => {
            this.translate
              .get('incidents.form.toastr.success.message')
              .subscribe((errorMessage: string) => {
                this.translate
                  .get('incidents.form.toastr.success.title')
                  .subscribe((errorTitle: string) => {
                    this.toastr.success(errorMessage, errorTitle);
                  });
              });
          },
          error: () => {
            this.translate
              .get('incidents.form.toastr.error.message')
              .subscribe((errorMessage: string) => {
                this.translate
                  .get('incidents.form.toastr.error.title')
                  .subscribe((errorTitle: string) => {
                    this.toastr.error(errorMessage, errorTitle);
                  });
              });
          },
        });
    }
  }

  makeAIPrediction() {
    this.isLoading = true;
    const message = {
      msg: this.descriptionControl?.value,
    };

    this.incidentsService
      .makeAIPrediction(message)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (IAresponse: any) => {
          this.aiSuggestion = IAresponse.text;
        },
      });

    this.showSuggestion = true;
  }

  get descriptionControl() {
    return this.incidentForm.get('description');
  }
}
