import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  plans = [
    { value: 'ENTREPRENEUR', label: 'clients.form.plans.entrepreneur' },
    { value: 'BUSINESS', label: 'clients.form.plans.business' },
    { value: 'BUSINESS_PLUS', label: 'clients.form.plans.business_plus' },
  ];

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
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
    this.getProfile();
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Form data:', this.profileForm.value);
      // TODO
    }
  }

  getProfile() {
    this.profileService.getProfile().subscribe({
      next: (resp) => console.log(resp),
    });
  }
}
