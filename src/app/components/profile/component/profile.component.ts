import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { UsersService } from '../../users/services/users.service';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileUser: any;
  companies: any[] = [];
  isDisabled = true;

  plans = [
    { value: 'ENTREPRENEUR', label: 'clients.form.plans.entrepreneur' },
    { value: 'BUSINESS', label: 'clients.form.plans.business' },
    { value: 'BUSINESS_PLUS', label: 'clients.form.plans.business_plus' },
  ];

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private usersService: UsersService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.profileForm = this.fb.group({
      company: ['', [Validators.required]],
      responsible: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)],
      ],
      dni: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      plan: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadProfileAndCompanies();
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.profileForm.touched) {
      const id = this.profileUser.id;
      const profileClient = {
        name: this.profileForm.get('responsible')?.value,
        phone: this.profileForm.get('phone')?.value,
        email: this.profileForm.get('email')?.value,
      };
      this.profileService.updateProfile(id, profileClient).subscribe({
        next: () => {
          this.translate
            .get('profile.toastr.success.message')
            .subscribe((errorMessage: string) => {
              this.translate
                .get('profile.toastr.success.title')
                .subscribe((errorTitle: string) => {
                  this.toastr.success(errorMessage, errorTitle);
                });
            });
        },
        error: () => {
          this.translate
            .get('profile.toastr.error.message')
            .subscribe((errorMessage: string) => {
              this.translate
                .get('profile.toastr.error.title')
                .subscribe((errorTitle: string) => {
                  this.toastr.error(errorMessage, errorTitle);
                });
            });
        },
      });
    }
  }

  loadProfileAndCompanies() {
    forkJoin({
      profile: this.profileService.getProfile(),
      companies: this.usersService.getCompanies(),
    }).subscribe({
      next: ({ profile, companies }) => {
        this.profileUser = profile.data;
        this.companies = companies.data;
        this.setCompanyName();
      },
      error: (err) => console.error('Error loading data', err),
    });
  }

  setCompanyName() {
    if (this.profileUser && this.companies.length > 0) {
      const company = this.companies.find(
        (comp) => comp.id === this.profileUser?.company_id
      );
      const companyName = company ? company.name : 'Unknown Company';

      this.profileForm.controls['company'].setValue(companyName);
      this.profileForm.controls['responsible'].setValue(this.profileUser.name);
      this.profileForm.controls['dni'].setValue(this.profileUser.dni);
      this.profileForm.controls['phone'].setValue(this.profileUser.phone);
      this.profileForm.controls['email'].setValue(this.profileUser.email);
      this.profileForm.controls['plan'].setValue(company.plan);
    } else {
      this.translate
        .get('profile.toastr.error.message')
        .subscribe((errorMessage: string) => {
          this.translate
            .get('profile.toastr.error.title')
            .subscribe((errorTitle: string) => {
              this.toastr.error(errorMessage, errorTitle);
            });
        });
    }
  }
}
