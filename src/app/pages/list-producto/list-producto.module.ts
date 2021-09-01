import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProductoPageRoutingModule } from './list-producto-routing.module';

import { ListProductoPage } from './list-producto.page';
import { FormProductoPage } from '../form-producto/form-producto.page';
import { FormProductoPageModule } from '../form-producto/form-producto.module';

@NgModule({
  entryComponents:[
    FormProductoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProductoPageRoutingModule,
    FormProductoPageModule
  ],
  declarations: [ListProductoPage]
})
export class ListProductoPageModule {}
