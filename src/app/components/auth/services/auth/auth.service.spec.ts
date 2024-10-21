import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientMock: any;

  beforeEach(() => {
    httpClientMock = {
      post: jest.fn(),
    };
    service = new AuthService(httpClientMock as HttpClient);

    const localStorageMock = (function () {
      let store: any = {};
      return {
        getItem: function (key: string) {
          return store[key] || null;
        },
        setItem: function (key: string, value: string) {
          store[key] = value.toString();
        },
        removeItem: function (key: string) {
          delete store[key];
        },
        clear: function () {
          store = {};
        },
      };
    })();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  it('should return null when there is no refresh token in localStorage', () => {
    localStorage.removeItem('refresh_token');

    service.refreshToken().subscribe((response) => {
      expect(response).toBeNull();
    });

    expect(localStorage.getItem('refresh_token')).toBe(null);
    expect(httpClientMock.post).not.toHaveBeenCalled();
  });

  it('should return the access_token from localStorage', () => {
    const mockToken = 'mockAccessToken';

    localStorage.setItem('access_token', mockToken);

    const token = service.getToken();
    expect(token).toBe(mockToken);
  });

  it('should remove tokens on logout', () => {
    localStorage.setItem('access_token', 'mockAccessToken');
    localStorage.setItem('refresh_token', 'mockRefreshToken');

    service.logout();

    expect(localStorage.getItem('access_token')).toBe(null);
    expect(localStorage.getItem('refresh_token')).toBe(null);
  });

  it('should refresh token if refresh_token is available in localStorage', () => {
    const refreshToken = 'mockRefreshToken';
    const responseMock = { access_token: 'newAccessToken' };

    jest.spyOn(window.localStorage, 'getItem').mockReturnValue(refreshToken);
    httpClientMock.post.mockReturnValue(of(responseMock));

    service.refreshToken().subscribe((response) => {
      expect(response.access_token).toBe('newAccessToken');
    });

    expect(localStorage.getItem('refresh_token')).toBe(refreshToken);

    const postArgs = httpClientMock.post.mock.calls[0][2];
    const headers = postArgs.headers;

    expect(headers.get('Authorization')).toBe(`Bearer ${refreshToken}`);
  });
});
