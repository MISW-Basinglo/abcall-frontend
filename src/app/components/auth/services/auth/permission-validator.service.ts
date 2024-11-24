import { Injectable } from '@angular/core';
import { Roles } from '../../../../utils/roles.enum';

@Injectable({
  providedIn: 'root',
})
export class PermissionValidatorService {
  private role: Roles | null = null;

  setRole(role: Roles): void {
    this.role = role;
  }

  hasAccess(section: string): boolean {
    const roleAccess: Record<Roles, string[]> = {
      [Roles.ADMIN]: ['clients'],
      [Roles.AGENT]: ['incidents', 'profile'],
      [Roles.CLIENT]: ['users', 'reports', 'profile'],
      [Roles.USER]: [],
    };

    return this.role ? roleAccess[this.role].includes(section) : false;
  }
}
