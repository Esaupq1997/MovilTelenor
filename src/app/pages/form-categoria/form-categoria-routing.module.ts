import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCategoriaPage } from './form-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: FormCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormCategoriaPageRoutingModule {}
