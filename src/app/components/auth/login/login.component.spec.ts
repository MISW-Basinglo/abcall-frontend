import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      navigate: jest.fn(),
    };
    component = new LoginComponent(routerMock);
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard when navigateToDashboard is called', () => {
    component.navigateToDashboard();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
