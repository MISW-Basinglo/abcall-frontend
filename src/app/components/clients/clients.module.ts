import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientsFormComponent } from './components/clients-form/clients-form.component';
import { SharedModule } from 'src/app/utils/shared.module';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [ClientsListComponent, ClientsFormComponent],
  imports: [CommonModule, ClientsRoutingModule, SharedModule, MatListModule],
  
})
export class ClientsModule {}
