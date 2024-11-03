import { FormBuilder } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfileService } from '../services/profile.service';
import { UsersService } from '../../users/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let formBuilder: FormBuilder;
  let profileServiceMock: jest.Mocked<ProfileService>;
  let usersServiceMock: jest.Mocked<UsersService>;
  let toastrServiceMock: jest.Mocked<ToastrService>;
  let translateServiceMock: jest.Mocked<TranslateService>;

  beforeEach(() => {
    formBuilder = new FormBuilder();

    profileServiceMock = {
      getProfile: jest
        .fn()
        .mockReturnValue(
          of({
            data: {
              id: 1,
              name: 'John Doe',
              dni: '12345678',
              phone: '987654321',
              email: 'john.doe@example.com',
              company_id: 2,
            },
          })
        ),
      updateProfile: jest.fn().mockReturnValue(of({})),
    } as unknown as jest.Mocked<ProfileService>;

    usersServiceMock = {
      getCompanies: jest
        .fn()
        .mockReturnValue(
          of({ data: [{ id: 2, name: 'Test Company', plan: 'ENTREPRENEUR' }] })
        ),
    } as unknown as jest.Mocked<UsersService>;

    toastrServiceMock = {
      success: jest.fn(),
      error: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    translateServiceMock = {
      get: jest.fn((key: string) => of(key)),
    } as unknown as jest.Mocked<TranslateService>;

    component = new ProfileComponent(
      formBuilder,
      profileServiceMock,
      usersServiceMock,
      toastrServiceMock,
      translateServiceMock
    );

    component.ngOnInit();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with values from profile data', () => {
    expect(component.profileForm).toBeDefined();
    expect(component.profileForm.controls['company'].value).toBe(
      'Test Company'
    );
    expect(component.profileForm.controls['responsible'].value).toBe(
      'John Doe'
    );
    expect(component.profileForm.controls['dni'].value).toBe('12345678');
    expect(component.profileForm.controls['phone'].value).toBe('987654321');
    expect(component.profileForm.controls['email'].value).toBe(
      'john.doe@example.com'
    );
    expect(component.profileForm.controls['plan'].value).toBe('ENTREPRENEUR');
  });

  it('should mark form as invalid when fields are empty', () => {
    component.profileForm.controls['company'].setValue('');
    component.profileForm.controls['responsible'].setValue('');
    component.profileForm.controls['dni'].setValue('');
    component.profileForm.controls['phone'].setValue('');
    component.profileForm.controls['email'].setValue('');
    component.profileForm.controls['plan'].setValue('');

    expect(component.profileForm.valid).toBeFalsy();
  });

  it('should mark form as valid when all fields are filled correctly', () => {
    component.profileForm.controls['company'].setValue('Test Company');
    component.profileForm.controls['responsible'].setValue('John Doe');
    component.profileForm.controls['dni'].setValue('12345678');
    component.profileForm.controls['phone'].setValue('987654321');
    component.profileForm.controls['email'].setValue('test@example.com');
    component.profileForm.controls['plan'].setValue('ENTREPRENEUR');

    expect(component.profileForm.valid).toBeTruthy();
  });

  it('should call profileService.updateProfile when onSubmit is called with valid and touched form data', () => {
    component.profileUser = { id: 1 };
    component.profileForm.controls['responsible'].setValue('John Doe');
    component.profileForm.controls['phone'].setValue('987654321');
    component.profileForm.controls['email'].setValue('test@example.com');

    component.profileForm.markAsTouched();
    component.onSubmit();

    expect(profileServiceMock.updateProfile).toHaveBeenCalledWith(1, {
      name: 'John Doe',
      phone: '987654321',
      email: 'test@example.com',
    });
  });
});
