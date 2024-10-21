import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentsListComponent } from './components/incidents-list/incidents-list.component';
import { IncidentsFormComponent } from './components/incidents-form/incidents-form.component';
import { SharedModule } from 'src/app/utils/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [IncidentsListComponent, IncidentsFormComponent],
  imports: [
    CommonModule,
    IncidentsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class IncidentsModule {}
