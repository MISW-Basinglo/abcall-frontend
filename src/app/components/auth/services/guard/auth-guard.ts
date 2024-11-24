import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { Roles } from 'src/app/utils/roles.enum';
import { AuthService } from '../auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data['role'] as Roles;
  const userRole = authService.getRole();

  console.log(userRole);

  if (!authService.isTokenValid()) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  if (userRole && userRole !== requiredRole) {
    const initialRoute = authService.getInitialRouteByRole(userRole);
    router.navigateByUrl(initialRoute);
    return false;
  }

  return true;
};
