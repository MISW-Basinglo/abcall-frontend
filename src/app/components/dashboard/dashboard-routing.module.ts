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

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'incidents', component: IncidentsListComponent },
      { path: 'incidents/detail/:id', component: IncidentDetailComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'reports', component: ReportComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'bd', component: BdKnowledgeComponent },
      { path: 'clients', component: ClientsListComponent },
      { path: '', redirectTo: 'incidents', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
