import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourrierComponent } from './courrier.component';

const routes: Routes = [
  {
    path: '',
     component: CourrierComponent,
    data: {
      title: 'Courrier'
    },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourrierRoutingModule { }

export const routedComponents = [CourrierComponent];
``
