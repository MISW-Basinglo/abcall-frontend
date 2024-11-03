import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClientData } from 'src/app/models/abcall.interfaces';
import { ClientsService } from '../../services/clients.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { UsersService } from 'src/app/components/users/services/users.service';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss'],
})
export class ClientsFormComponent implements OnInit {
  clientsForm: FormGroup;

  plans = [
    { value: 'ENTREPRENEUR', label: 'clients.form.plans.entrepreneur' },
    { value: 'BUSINESS', label: 'clients.form.plans.business' },
    { value: 'BUSINESS_PLUS', label: 'clients.form.plans.business_plus' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public clientData: IClientData | null,
    private clientsService: ClientsService,
    private toastr: ToastrService,
    private usersService: UsersService,
    private translate: TranslateService
  ) {
    this.clientsForm = this.fb.group({
      company_name: ['', [Validators.required]],
      nit: ['', [Validators.required, Validators.pattern(/^[0-9-]+$/)]],
      user_name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      ],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      plan: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.clientData) {
      this.clientsForm.patchValue({
        company_name: this.clientData.name,
        nit: this.clientData.nit,
        user_name: this.clientData.responsible_name,
        phone: this.clientData.responsible_phone,
        email: this.clientData.responsible_email,
        plan: this.clientData.plan,
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitForm() {
    const client = this.clientsForm.value;
    if (this.isEmptyObject(this.clientData)) {
      if (this.clientsForm.valid) {
        this.clientsService.createClient(client).subscribe({
          next: () => {
            this.translate
              .get('clients.form.toastr.success.message')
              .pipe(
                finalize(() => this.dialogRef.close(this.clientsForm.value))
              )
              .subscribe((errorMessage: string) => {
                this.translate
                  .get('clients.form.toastr.success.title')
                  .subscribe((errorTitle: string) => {
                    this.toastr.success(errorMessage, errorTitle);
                  });
              });
          },
          error: () => {
            this.translate
              .get('clients.form.toastr.error.message')
              .subscribe((errorMessage: string) => {
                this.translate
                  .get('clients.form.toastr.error.title')
                  .subscribe((errorTitle: string) => {
                    this.toastr.error(errorMessage, errorTitle);
                  });
              });
          },
        });
      }
    } else {
      if (this.clientsForm.valid) {
        const companyToSave = {
          plan: client.plan,
        };

        this.usersService
          .updateCompany(this.clientData!.id, companyToSave)
          .subscribe({
            next: () => {
              this.translate
                .get('clients.form.toastr.success.editionMessage')
                .pipe(
                  finalize(() => this.dialogRef.close(this.clientsForm.value))
                )
                .subscribe((errorMessage: string) => {
                  this.translate
                    .get('clients.form.toastr.success.editionTitle')
                    .subscribe((errorTitle: string) => {
                      this.toastr.success(errorMessage, errorTitle);
                    });
                });
            },

            error: () => {
              this.translate
                .get('clients.form.toastr.error.message')
                .subscribe((errorMessage: string) => {
                  this.translate
                    .get('clients.form.toastr.error.title')
                    .subscribe((errorTitle: string) => {
                      this.toastr.error(errorMessage, errorTitle);
                    });
                });
            },
          });
      }
    }
  }

  isEmptyObject = (obj: object | null | undefined): boolean => {
    return !obj || Object.keys(obj).length === 0;
  };
}
