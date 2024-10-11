import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientsFormComponent } from './components/clients-form/clients-form.component';
import { SharedModule } from 'src/app/utils/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ClientsListComponent, ClientsFormComponent],
  imports: [CommonModule, ClientsRoutingModule, SharedModule, TranslateModule],
  
})
export class ClientsModule {}
