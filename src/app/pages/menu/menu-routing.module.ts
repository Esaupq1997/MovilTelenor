import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children:[
      {
        path: 'inicio',
        loadChildren: () => import('../../pages/inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: 'list-producto',
        loadChildren: () => import('../../pages/list-producto/list-producto.module').then( m => m.ListProductoPageModule)
      },
      {
        path: 'form-producto',
        loadChildren: () => import('../../pages/form-producto/form-producto.module').then( m => m.FormProductoPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
