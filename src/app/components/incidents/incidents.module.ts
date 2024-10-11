import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentsListComponent } from './components/incidents-list/incidents-list.component';
import { IncidentsFormComponent } from './components/incidents-form/incidents-form.component';


@NgModule({
  declarations: [
    IncidentsListComponent,
    IncidentsFormComponent
  ],
  imports: [
    CommonModule,
    IncidentsRoutingModule
  ]
})
export class IncidentsModule { }
