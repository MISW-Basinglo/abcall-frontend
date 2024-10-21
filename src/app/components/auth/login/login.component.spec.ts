import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authServiceMock: any;
  let routerMock: any;
  let toastrMock: any;
  let translateMock: any;

  beforeEach(() => {
    authServiceMock = {
      login: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    toastrMock = {
      error: jest.fn(),
    };

    translateMock = {
      get: jest.fn((key: string) => of(key)),
    };

    component = new LoginComponent(
      authServiceMock,
      routerMock,
      toastrMock,
      translateMock
    );
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard on successful login', () => {
    const responseMock = {
      access_token: 'mock_access_token',
      refresh_token: 'mock_refresh_token',
    };

    authServiceMock.login.mockReturnValue(of(responseMock));

    component.login();

    expect(authServiceMock.login).toHaveBeenCalledWith(
      component.email,
      component.password
    );
    expect(localStorage.getItem('access_token')).toBe('mock_access_token');
    expect(localStorage.getItem('refresh_token')).toBe('mock_refresh_token');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show an error toast on login failure', () => {
    const errorResponse = { status: 401, message: 'Unauthorized' };

    authServiceMock.login.mockReturnValue(throwError(errorResponse));
    translateMock.get
      .mockReturnValueOnce(of('Login failed'))
      .mockReturnValueOnce(of('Error'));

    component.login();

    expect(authServiceMock.login).toHaveBeenCalledWith(
      component.email,
      component.password
    );
    expect(toastrMock.error).toHaveBeenCalledWith('Login failed', 'Error');
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
