import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { Roles } from '../../../utils/roles.enum';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authServiceMock: any;
  let routerMock: any;
  let toastrMock: any;
  let translateMock: any;

  beforeEach(() => {
    authServiceMock = {
      login: jest.fn(),
      getInitialRouteByRole: jest.fn((role: Roles) =>
        role === Roles.ADMIN ? '/dashboard/clients' : '/dashboard'
      ),
    };

    routerMock = {
      navigateByUrl: jest.fn(),
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

  it('should navigate to the initial route based on role on successful login', () => {
    const responseMock = {
      access_token: 'mock_access_token',
      refresh_token: 'mock_refresh_token',
    };

    const decodedTokenMock = { role: Roles.ADMIN };

    jest.spyOn(component, 'decodeJWT').mockReturnValue(decodedTokenMock);
    authServiceMock.login.mockReturnValue(of(responseMock));

    component.login();

    expect(authServiceMock.login).toHaveBeenCalledWith(
      component.email,
      component.password
    );
    expect(localStorage.getItem('access_token')).toBe('mock_access_token');
    expect(localStorage.getItem('refresh_token')).toBe('mock_refresh_token');
    expect(localStorage.getItem('user_role')).toBe(Roles.ADMIN);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/dashboard/clients');
  });

  it('should show an error toast if the role is USER', () => {
    const responseMock = {
      access_token: 'mock_access_token',
      refresh_token: 'mock_refresh_token',
    };

    const decodedTokenMock = { role: Roles.USER };

    jest.spyOn(component, 'decodeJWT').mockReturnValue(decodedTokenMock);
    authServiceMock.login.mockReturnValue(of(responseMock));

    translateMock.get.mockReturnValue(of('Invalid credentials'));

    component.login();

    expect(authServiceMock.login).toHaveBeenCalledWith(
      component.email,
      component.password
    );
    expect(toastrMock.error).toHaveBeenCalledWith(
      'Invalid credentials',
      expect.any(String)
    );
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
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
    expect(toastrMock.error).toHaveBeenCalledWith(
      'Login failed',
      'Login failed'
    );
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
  });
});
