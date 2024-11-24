import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Roles } from '../../../../utils/roles.enum';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientMock: any;
  let routerMock: any;

  beforeEach(() => {
    httpClientMock = {
      post: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    service = new AuthService(httpClientMock as HttpClient, routerMock as Router);

    const localStorageMock = (function () {
      let store: any = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => (store[key] = value.toString()),
        removeItem: (key: string) => delete store[key],
        clear: () => (store = {}),
      };
    })();

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  it('should return the access_token from localStorage', () => {
    const mockToken = 'mockAccessToken';
    localStorage.setItem('access_token', mockToken);

    const token = service.getToken();
    expect(token).toBe(mockToken);
  });

  it('should validate token if access_token exists', () => {
    localStorage.setItem('access_token', 'mockAccessToken');
    expect(service.isTokenValid()).toBe(true);
  });

  it('should invalidate token if access_token does not exist', () => {
    localStorage.removeItem('access_token');
    expect(service.isTokenValid()).toBe(false);
  });

  it('should remove tokens and navigate to login on logout', () => {
    localStorage.setItem('access_token', 'mockAccessToken');
    localStorage.setItem('refresh_token', 'mockRefreshToken');
    localStorage.setItem('user_role', Roles.ADMIN);

    service.logout();

    expect(localStorage.getItem('access_token')).toBe(null);
    expect(localStorage.getItem('refresh_token')).toBe(null);
    expect(localStorage.getItem('user_role')).toBe(null);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should return the user role from localStorage', () => {
    localStorage.setItem('user_role', Roles.ADMIN);
    expect(service.getRole()).toBe(Roles.ADMIN);
  });

  it('should return null if no user role is found in localStorage', () => {
    localStorage.removeItem('user_role');
    expect(service.getRole()).toBeNull();
  });

  it('should return the initial route based on role', () => {
    expect(service.getInitialRouteByRole(Roles.ADMIN)).toBe('/dashboard/clients');
    expect(service.getInitialRouteByRole(Roles.AGENT)).toBe('/dashboard/incidents');
    expect(service.getInitialRouteByRole(Roles.CLIENT)).toBe('/dashboard/users');
    expect(service.getInitialRouteByRole(Roles.USER)).toBe('/auth/login');
  });

  it('should perform login request', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const responseMock = { access_token: 'mockAccessToken', refresh_token: 'mockRefreshToken' };

    httpClientMock.post.mockReturnValue(of(responseMock));

    service.login(email, password).subscribe((response) => {
      expect(response).toEqual(responseMock);
    });

    const [url, body, options] = httpClientMock.post.mock.calls[0];
    expect(url).toBe(`${service.apiUrl}/login`);
    expect(body).toEqual({ email, password });
    expect(options.headers.get('Content-Type')).toBe('application/json');
  });
});
