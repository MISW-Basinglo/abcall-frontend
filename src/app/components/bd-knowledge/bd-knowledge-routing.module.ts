import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BdKnowledgeComponent } from './bd-knowledge/bd-knowledge.component';

const routes: Routes = [
  {
    path: '',
    component: BdKnowledgeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BdKnowledgeRoutingModule { }
