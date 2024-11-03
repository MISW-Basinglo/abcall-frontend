import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentsListComponent } from './components/incidents-list/incidents-list.component';
import { IncidentDetailComponent } from './components/incident-detail/incident-detail.component';

const routes: Routes = [
  {
    path: '',
    component: IncidentsListComponent,
  },
  {
    path: 'detail/:id',
    component: IncidentDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentsRoutingModule {}
