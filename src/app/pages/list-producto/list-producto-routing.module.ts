import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProductoPage } from './list-producto.page';

const routes: Routes = [
  {
    path: '',
    component: ListProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProductoPageRoutingModule {}
