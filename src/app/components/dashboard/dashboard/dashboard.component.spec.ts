import { DashboardComponent } from './dashboard.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(() => {
    routerMock = {
      navigate: jest.fn(),
      url: '/dashboard/incidents',
    };

    activatedRouteMock = {
      url: of([{ path: 'incidents' }]),
    };

    component = new DashboardComponent(routerMock, activatedRouteMock);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct selectedTab from route', () => {
    component.ngOnInit();
    expect(component.selectedTab).toBe('incidents');
  });

  it('should navigate to the correct tab when selectTab is called', () => {
    const tab = 'users';
    component.selectTab(tab);
    expect(component.selectedTab).toBe(tab);
    expect(routerMock.navigate).toHaveBeenCalledWith([`/dashboard/${tab}`]);
  });

  it('should toggle the menu state when toggleMenu is called', () => {
    component.isMenuOpened = true;
    component.toggleMenu();
    expect(component.isMenuOpened).toBe(false);

    component.toggleMenu();
    expect(component.isMenuOpened).toBe(true);
  });
});
