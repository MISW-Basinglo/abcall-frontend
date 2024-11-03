import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as Papa from 'papaparse';
import { finalize } from 'rxjs';
import { ClientsService } from 'src/app/components/clients/services/clients.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent {
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<UsersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private clientsService: ClientsService,
    private translate: TranslateService
  ) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.validateAndSetFile(file);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.validateAndSetFile(input.files[0]);
    }
  }

  validateAndSetFile(file: File) {
    if (file.type !== 'text/csv') {
      this.translate
        .get('users.toastr.validateWarning')
        .subscribe((errorMessage: string) => {
          this.translate
            .get('users.toastr.validateTitleError')
            .subscribe((errorTitle: string) => {
              this.toastr.error(errorMessage, errorTitle);
            });
        });
      this.selectedFile = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const csvContent = reader.result as string;
      this.parseAndValidateCSV(csvContent, file);
    };
    reader.readAsText(file);
  }

  parseAndValidateCSV(csvContent: string, file: File) {
    Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      complete: (result: any) => {
        const data = result.data as any[];
        if (this.isCSVStructureValid(data)) {
          this.selectedFile = file;

          this.translate
            .get('users.toastr.validateMsg')
            .subscribe((errorMessage: string) => {
              this.translate
                .get('users.toastr.validateTitle')
                .subscribe((errorTitle: string) => {
                  this.toastr.success(errorMessage, errorTitle);
                });
            });
        } else {
          this.translate
            .get('users.toastr.validateTitleError')
            .subscribe((errorMessage: string) => {
              this.translate
                .get('users.toastr.validateMsgError')
                .subscribe((errorTitle: string) => {
                  this.toastr.error(errorMessage, errorTitle);
                });
            });
          this.selectedFile = null;
        }
      },
      error: () => {
        this.translate
          .get('users.toastr.validateReadingFile')
          .subscribe((errorMessage: string) => {
            this.translate
              .get('users.toastr.validateTitleError')
              .subscribe((errorTitle: string) => {
                this.toastr.error(errorMessage, errorTitle);
              });
          });
        this.selectedFile = null;
      },
    });
  }

  isCSVStructureValid(data: any[]): boolean {
    const requiredColumns = ['name', 'phone', 'email', 'dni', 'importance'];
    return data.every((row) =>
      requiredColumns.every((column) => column in row)
    );
  }

  handleFileUpload() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1] ?? '';
        const body = {
          users: base64String,
        };

        this.clientsService.importUsers(body).subscribe({
          next: () => {
            this.translate
              .get('clients.form.toastr.success.message')
              .pipe(finalize(() => this.dialogRef.close(base64String)))
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
              .get('users.list.loadUsers.loadingErrorMsg')
              .subscribe((errorMessage: string) => {
                this.translate
                  .get('users.list.loadUsers.loadingErrorTitle')
                  .subscribe((errorTitle: string) => {
                    this.toastr.error(errorMessage, errorTitle);
                  });
              });
          },
        });
      };
      reader.onerror = () => {
        this.translate
          .get('clients.form.toastr.success.message')
          .subscribe((errorMessage: string) => {
            this.translate
              .get('clients.form.toastr.success.title')
              .subscribe((errorTitle: string) => {
                this.toastr.success(errorMessage, errorTitle);
              });
          });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
