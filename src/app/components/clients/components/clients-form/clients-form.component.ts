import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss'],
})
export class ClientsFormComponent {
  clientsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientsFormComponent>
  ) {
    this.clientsForm = this.fb.group({
      nombreEmpresa: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      responsable: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      plan: ['', [Validators.required]],
    });
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
}
