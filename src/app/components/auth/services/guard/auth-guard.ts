import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

export const authGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isTokenValid()) {
    return of(true);
  } else {
    
    return authService.handleTokenExpiration().pipe(
      switchMap((isTokenRefreshed: boolean) => {
        if (isTokenRefreshed) {
          return of(true);
        } else {
          router.navigate(['/auth/login']);
          return of(false);
        }
      }),
      catchError(() => {
        router.navigate(['/auth/login']);
        return of(false);
      })
    );
  }
};
