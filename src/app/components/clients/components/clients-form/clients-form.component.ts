import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClientData } from 'src/app/models/abcall.interfaces';

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
    @Inject(MAT_DIALOG_DATA) public clientData: IClientData
  ) {
    this.clientsForm = this.fb.group({
      company: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      responsible: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      plan: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.clientData) {
      console.log(this.clientData);
      this.clientsForm.patchValue({
        company: this.clientData.company,
        nit: this.clientData.nit,
        responsible: this.clientData.responsible,
        phone: this.clientData.phone,
        email: this.clientData.email,
        plan: this.clientData.plan,
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitForm() {
    if (this.clientsForm.valid) {
      console.log(this.clientsForm.value);
      this.dialogRef.close(this.clientsForm.value);
    }
  }

  isEmptyObject = (obj: object): boolean => {
    return Object.keys(obj).length === 0;
  };
}
