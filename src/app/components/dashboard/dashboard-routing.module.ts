import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncidentsListComponent } from '../incidents/components/incidents-list/incidents-list.component';
import { UsersListComponent } from '../users/components/users-list/users-list.component';
import { ReportComponent } from '../reports/report/report.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'incidents', component: IncidentsListComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'reports', component: ReportComponent },
      { path: '', redirectTo: 'incidents', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
