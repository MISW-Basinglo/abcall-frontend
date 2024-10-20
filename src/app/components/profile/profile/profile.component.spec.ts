import { FormBuilder } from '@angular/forms';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    component = new ProfileComponent(formBuilder);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty controls and validators', () => {
    expect(component.profileForm).toBeDefined();
    expect(component.profileForm.controls['company'].value).toBe('');
    expect(component.profileForm.controls['responsible'].value).toBe('');
    expect(component.profileForm.controls['dni'].value).toBe('');
    expect(component.profileForm.controls['phone'].value).toBe('');
    expect(component.profileForm.controls['email'].value).toBe('');
    expect(component.profileForm.controls['plan'].value).toBe('');

    expect(component.profileForm.controls['company'].validator).toBeTruthy();
    expect(
      component.profileForm.controls['responsible'].validator
    ).toBeTruthy();
    expect(component.profileForm.controls['dni'].validator).toBeTruthy();
    expect(component.profileForm.controls['phone'].validator).toBeTruthy();
    expect(component.profileForm.controls['email'].validator).toBeTruthy();
    expect(component.profileForm.controls['plan'].validator).toBeTruthy();
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
});
