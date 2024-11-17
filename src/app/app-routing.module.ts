import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './components/auth/services/guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./components/users/users.module').then((m) => m.UsersModule),
    canActivate: [authGuard],
  },
  {
    path: 'incidents',
    loadChildren: () =>
      import('./components/incidents/incidents.module').then(
        (m) => m.IncidentsModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'bd_knowledge',
    loadChildren: () =>
      import('./components/bd-knowledge/bd-knowledge.module').then(
        (m) => m.BdKnowledgeModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./components/clients/clients.module').then(
        (m) => m.ClientsModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./components/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./components/reports/reports.module').then(
        (m) => m.ReportsModule
      ),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
