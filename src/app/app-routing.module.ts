import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  },
  {
    path: 'incidents',
    loadChildren: () =>
      import('./components/incidents/incidents.module').then(
        (m) => m.IncidentsModule
      ),
  },
  {
    path: 'bd_knowledge',
    loadChildren: () =>
      import('./components/bd-knowledge/bd-knowledge.module').then(
        (m) => m.BdKnowledgeModule
      ),
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./components/clients/clients.module').then(
        (m) => m.ClientsModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
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
