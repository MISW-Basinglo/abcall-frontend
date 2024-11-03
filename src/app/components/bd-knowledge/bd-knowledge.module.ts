import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BdKnowledgeRoutingModule } from './bd-knowledge-routing.module';
import { BdKnowledgeComponent } from './bd-knowledge/bd-knowledge.component';


@NgModule({
  declarations: [
    BdKnowledgeComponent
  ],
  imports: [
    CommonModule,
    BdKnowledgeRoutingModule
  ]
})
export class BdKnowledgeModule { }
