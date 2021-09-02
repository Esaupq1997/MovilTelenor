import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormMarcaPage } from './form-marca.page';

const routes: Routes = [
  {
    path: '',
    component: FormMarcaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormMarcaPageRoutingModule {}
