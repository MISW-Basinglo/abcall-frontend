import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncidentsListComponent } from '../incidents/components/incidents-list/incidents-list.component';
import { UsersListComponent } from '../users/components/users-list/users-list.component';
import { ReportComponent } from '../reports/report/report.component';
import { ProfileComponent } from '../profile/component/profile.component';
import { BdKnowledgeComponent } from '../bd-knowledge/bd-knowledge/bd-knowledge.component';
import { ClientsListComponent } from '../clients/components/clients-list/clients-list.component';
import { IncidentDetailComponent } from '../incidents/components/incident-detail/incident-detail.component';
import { roleGuard } from '../auth/services/guard/auth-guard';
import { Roles } from 'src/app/utils/roles.enum';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'incidents',
        component: IncidentsListComponent,
        canActivate: [roleGuard],
        data: { role: Roles.AGENT },
      },
      {
        path: 'incidents/detail/:id',
        component: IncidentDetailComponent,
        canActivate: [roleGuard],
        data: { role: Roles.AGENT },
      },
      {
        path: 'users',
        component: UsersListComponent,
        canActivate: [roleGuard],
        data: { role: Roles.CLIENT },
      },
      {
        path: 'reports',
        component: ReportComponent,
        canActivate: [roleGuard],
        data: { role: Roles.CLIENT },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [roleGuard],
        data: { role: Roles.CLIENT },
      },
      {
        path: 'bd',
        component: BdKnowledgeComponent,
        canActivate: [roleGuard],
        data: { role: Roles.ADMIN },
      },
      {
        path: 'clients',
        component: ClientsListComponent,
        canActivate: [roleGuard],
        data: { role: Roles.ADMIN },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
