import { IncidentDetailComponent } from './incident-detail.component';
import {
  ActivatedRoute,
  Router,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { IncidentsService } from '../../services/incidents.service';
import { UsersService } from 'src/app/components/users/services/users.service';
import { ClientsService } from 'src/app/components/clients/services/clients.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

describe('IncidentDetailComponent', () => {
  let component: IncidentDetailComponent;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockRouter: Partial<Router>;
  let mockIncidentsService: Partial<IncidentsService>;
  let mockUsersService: Partial<UsersService>;
  let mockClientsService: Partial<ClientsService>;
  let mockMatDialog: Partial<MatDialog>;
  let mockChangeDetectorRef: Partial<ChangeDetectorRef>;
  let toastrServiceMock: Partial<ToastrService>;
  let translateServiceMock: Partial<TranslateService>;

  beforeEach(() => {
    toastrServiceMock = { success: jest.fn(), error: jest.fn() };
    translateServiceMock = { get: jest.fn((key) => of(key)) };
    const mockParamMap = {
      get: jest.fn().mockReturnValue('1'),
      has: jest.fn().mockReturnValue(true),
      getAll: jest.fn().mockReturnValue(['1']),
      keys: [],
    };

    const mockActivatedRouteSnapshot: Partial<ActivatedRouteSnapshot> = {
      paramMap: mockParamMap as any,
      url: [],
      params: {},
      queryParams: {},
      fragment: null,
      data: {},
      outlet: '',
      component: null,
      routeConfig: null,
      root: null!,
      parent: null,
      firstChild: null,
      children: [],
      pathFromRoot: [],
      queryParamMap: mockParamMap,
    };

    mockActivatedRoute = {
      snapshot: mockActivatedRouteSnapshot as ActivatedRouteSnapshot,
    };

    mockRouter = {
      navigate: jest.fn(),
    };
    mockIncidentsService = {
      getIssueById: jest
        .fn()
        .mockReturnValue(of({ data: { user_id: 1, company_id: 2 } })),
      getListOfCalls: jest
        .fn()
        .mockReturnValue(of({ data: [{ id: 1 }, { id: 2 }] })),
    };
    mockUsersService = {
      getCompanyById: jest
        .fn()
        .mockReturnValue(of({ data: { name: 'Company A' } })),
    };
    mockClientsService = {
      getUser: jest.fn().mockReturnValue(of({ data: { importance: 5 } })),
    };
    mockMatDialog = {
      open: jest.fn(),
    };
    mockChangeDetectorRef = {
      detectChanges: jest.fn(),
    };

    component = new IncidentDetailComponent(
      mockActivatedRoute as ActivatedRoute,
      mockRouter as Router,
      mockIncidentsService as IncidentsService,
      mockUsersService as UsersService,
      mockClientsService as ClientsService,
      mockMatDialog as MatDialog,
      mockChangeDetectorRef as ChangeDetectorRef,
      toastrServiceMock as ToastrService,
      translateServiceMock as TranslateService
    );
  });

  it('should initialize incidentId from route parameters', () => {
    component.ngOnInit();
    expect(component.incidentId).toBe('1');
  });
});
