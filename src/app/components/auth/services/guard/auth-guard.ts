import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

export const authGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token) {
    return authService.isTokenValid(token).pipe(
      map((isValid: boolean) => {
        if (isValid) {
          return true;
        } else {
          router.navigate(['/auth/login']);
          return false;
        }
      }),
      catchError(() => {
        router.navigate(['/auth/login']);
        return of(false);
      })
    );
  } else {
    router.navigate(['/auth/login']);
    return of(false);
  }
};
