import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProductosService } from 'src/app/services/productos.service';
import { FormProductoPage } from '../form-producto/form-producto.page';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.page.html',
  styleUrls: ['./list-producto.page.scss'],
})
export class ListProductoPage implements OnInit {
  producto:any = [];
  constructor(private prductoService:ProductosService,
    private router: Router,
    private modalController: ModalController) { }

  ngOnInit() {
    console.log("Prueba de pdouctos");
    this.getProductos();
  }
  getProductos(){
    this.prductoService.getProductos().subscribe(
      res => {
        this.producto = res;
        this.producto = this.producto.producto;
      
        for(let i =0; i<this.producto.length; i++){
          if(this.producto[i].prod_imagen ==""){
            this.producto[i].prod_imagen = "https://www.esconsa.net/wp-content/uploads/2020/06/SIN-IMAGEN.jpg";
          }
        }
        console.log(this.producto); 
      },
      err => console.error(err)
    );
  }

  ionViewWillEnter(){
    this.getProductos();
  }

  goAddProducto(){
    this.router.navigate(['/menu/form-producto'])
  }

  async abrirModalProducto(idProductos:any){
    console.log("id" + idProductos);
    const modalProducto = await this.modalController.create({
      component: FormProductoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        idProducto: idProductos
      }
    });
    await modalProducto.present();

    const { data } = await modalProducto.onWillDismiss();
    console.log(data);
    if(data == "Guardado"){
      console.log("entro a guardado")
      this.getProductos();
    }
  }
}
