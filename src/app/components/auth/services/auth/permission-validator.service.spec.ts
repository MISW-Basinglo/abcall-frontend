import { PermissionValidatorService } from './permission-validator.service';
import { Roles } from '../../../../utils/roles.enum';

describe('PermissionValidatorService', () => {
  let service: PermissionValidatorService;

  beforeEach(() => {
    service = new PermissionValidatorService();
  });

  it('should allow access to "clients" for ADMIN role', () => {
    service.setRole(Roles.ADMIN);
    expect(service.hasAccess('clients')).toBe(true);
    expect(service.hasAccess('incidents')).toBe(false);
  });

  it('should allow access to "incidents" and "profile" for AGENT role', () => {
    service.setRole(Roles.AGENT);
    expect(service.hasAccess('incidents')).toBe(true);
    expect(service.hasAccess('profile')).toBe(true);
    expect(service.hasAccess('clients')).toBe(false);
  });

  it('should allow access to "users", "reports", and "profile" for CLIENT role', () => {
    service.setRole(Roles.CLIENT);
    expect(service.hasAccess('users')).toBe(true);
    expect(service.hasAccess('reports')).toBe(true);
    expect(service.hasAccess('profile')).toBe(true);
    expect(service.hasAccess('clients')).toBe(false);
  });

  it('should deny access to all sections for USER role', () => {
    service.setRole(Roles.USER);
    expect(service.hasAccess('clients')).toBe(false);
    expect(service.hasAccess('incidents')).toBe(false);
    expect(service.hasAccess('profile')).toBe(false);
  });

  it('should deny access to all sections if no role is set', () => {
    expect(service.hasAccess('clients')).toBe(false);
    expect(service.hasAccess('incidents')).toBe(false);
    expect(service.hasAccess('profile')).toBe(false);
  });
});
