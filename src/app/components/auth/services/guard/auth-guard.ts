import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = (route.data['roles'] as string[]) || [
    route.data['role'],
  ];
  const userRole = authService.getRole();

  const normalizedUserRole = userRole?.toLowerCase();
  const normalizedRequiredRoles = requiredRoles.map((role) =>
    role.toLowerCase()
  );

  console.log('Normalized User Role:', normalizedUserRole);
  console.log('Normalized Required Roles:', normalizedRequiredRoles);

  if (!authService.isTokenValid()) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  if (
    !normalizedUserRole ||
    !normalizedRequiredRoles.includes(normalizedUserRole)
  ) {
    const initialRoute = userRole
      ? authService.getInitialRouteByRole(userRole)
      : '/auth/login';
    router.navigateByUrl(initialRoute);
    return false;
  }

  return true;
};
