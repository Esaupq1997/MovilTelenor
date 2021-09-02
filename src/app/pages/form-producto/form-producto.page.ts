import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/Producto';
import { CategoriasService } from 'src/app/services/categoria.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';
import { AlertController } from '@ionic/angular';
import { HistorialProducto } from 'src/app/interfaces/HistorialProducto';
import { HistorialProductoService } from 'src/app/services/historial-producto.service';
import { AuthService } from 'src/app/services/auth.service';

import { FormCategoriaPage } from '../form-categoria/form-categoria.page';
import { FormMarcaPage } from '../form-marca/form-marca.page';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.page.html',
  styleUrls: ['./form-producto.page.scss'],
})
export class FormProductoPage implements OnInit {

  @Input() idProducto;
  @Input() cambioTiempo: any;

  precioActual:any = "";

  categoria:any = [];
  marca:any = [];
  medida:any = [];
  tipoProducto:any = [];

  formProducto = new FormGroup({
    modeloProducto: new FormControl(),
    descripcionProducto: new FormControl(),
    caracteristicaProducto : new FormControl(),
    categoriaProducto : new FormControl(),
    marcaProducto : new FormControl(),
    medidaProducto : new FormControl(),
    tipoProducto : new FormControl(),
    activoProducto : new FormControl(),
    precioProducto : new FormControl(),
    imgProducto : new FormControl()
  });

  historialProducto:HistorialProducto = {
    id_historial: 0,
    id_producto: 0,
    hist_modelo: "",
    hist_descripcion: "",
    hist_caracteristica: "",
    hist_stock: 0,
    hist_imagen: "",
    hist_activo: "",
    hist_precioVenta: 0,
    hist_cambioTiempo:"",
    fk_id_categoria: "",
    fk_id_marca: "",
    fk_id_medida: "",
    fk_id_tipo: "",
    fk_id_usuario:""
  }

  producto: Producto = {
    id_Producto: 0,
    prod_modelo: "",
    prod_descripcion: "",
    prod_caracteristica: "",
    prod_stock: 0,
    prod_imagen: "",
    prod_activo: "",
    prod_precioVenta: 0,
    fk_id_categoria: "",
    createdAt:"",
    fk_id_marca: "",
    fk_id_medida: "",
    fk_id_tipo: ""
  };

  constructor(public alertController: AlertController,
    private marcaService: MarcaService, 
    private productoService: ProductosService, 
    private categoriaService: CategoriasService,
    private medidaService: UnidadMedidaService, 
    private tipoProductoService: TipoProductoService, 
    private router: Router, 
    private modalCtrl:ModalController,
    private historialProductoService:HistorialProductoService,
    private authService:AuthService,
    private activatedRoute: ActivatedRoute,
    private prductoService:ProductosService) { }
    
    edit:boolean;
  ngOnInit() {

    if(this.cambioTiempo == true){
      this.historialProducto.hist_cambioTiempo = "Precio Editado por Falta de Ventas";
    }
    else{
      this.historialProducto.hist_cambioTiempo = "Editado";
    }

    this.producto.prod_activo = "true";
    this.edit = false;
    this.getCategoria();
    this.getMarca();
    this.getMedida();
    this.getTipoProducto();

    console.log(this.idProducto);
    if(this.idProducto!=""){
      this.edit = true;
      this.productoService.getProducto(this.idProducto)
      .subscribe(
        res => {
          this.producto = res;
          this.precioActual = this.producto.prod_precioVenta
        },
        err => console.log(err)
      )
    }
    else{
      console.log("vacio");
    }
    
  }

  getCategoria(){
    this.categoriaService.getCategorias().subscribe(
      res=>{
        this.categoria = res;
        console.log(this.categoria);
        this.categoria = this.categoria.categoria;
      }
    )
  }

  getMarca(){
    this.marcaService.getMarcas().subscribe(
      res=>{
        this.marca = res;
        this.marca = this.marca.marca;
      }
    )
  }

  getMedida(){
    this.medidaService.getMedidas().subscribe(
      res=>{
        this.medida = res;
        this.medida = this.medida.medida;
      }
    )
  }

  getTipoProducto(){
    this.tipoProductoService.getTipoProductos().subscribe(
      res=>{
        this.tipoProducto = res;
        this.tipoProducto = this.tipoProducto.tipoProducto;
      }
    )
  }

  dismissModal(cerrado:string) {
    this.modalCtrl.dismiss(cerrado);
    
  }

  saveNewProducto(){

    console.log(this.producto);
    
    this.productoService.saveProducto(this.producto)
    .subscribe(async ok =>{
      

      if( ok == true ) {
        
        this.getProductos()

        this.dismissModal('Guardado');
      }
      else{
        this.formProducto.markAllAsTouched();
        console.log(ok);
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Alerta',
            message: ok,
            buttons: ['OK']
          });
      
          await alert.present();
      
          const { role } = await alert.onDidDismiss();
        
      }
      
    });
  }

  productos:any = [];
  getProductos(){
    this.productoService.getProductos().subscribe(
      res => {
        this.productos = res;
        this.productos = this.productos.producto;
        let tamaño = this.productos.length; 

        
        this.producto = this.productos[tamaño-1];
        
        this.historialProducto.id_producto = this.producto.id_Producto;
        this.historialProducto.hist_modelo = this.producto.prod_modelo;
        this.historialProducto.hist_descripcion = this.producto.prod_descripcion;
        this.historialProducto.hist_caracteristica = this.producto.prod_caracteristica;
        this.historialProducto.hist_stock = this.producto.prod_stock;
        this.historialProducto.hist_imagen = this.producto.prod_imagen;
        this.historialProducto.hist_activo = this.producto.prod_activo;
        this.historialProducto.hist_precioVenta = this.producto.prod_precioVenta;
        this.historialProducto.hist_activo = this.producto.prod_activo;
        this.historialProducto.fk_id_categoria = this.producto.fk_id_categoria;
        this.historialProducto.fk_id_marca = this.producto.fk_id_marca;
        this.historialProducto.fk_id_medida = this.producto.fk_id_medida;
        this.historialProducto.fk_id_tipo = this.producto.fk_id_tipo;
        this.historialProducto.hist_cambioTiempo = "Creado";
        this.historialProducto.fk_id_usuario = this.usuario.uid;

        this.historialProductoService.saveHistorialProducto(this.historialProducto)
        .subscribe(ok =>{
          if( ok == true ) {
            console.log("Historial guardado")
            
    
          }else{

            console.log("Error - Historial no guardado")
          }
        })


      },
      err => console.error(err)
    );
  }

  async updateProducto(){
    console.log("prueba");
    const params = this.activatedRoute.snapshot.params;
    if(this.cambioTiempo == true){
      if(this.precioActual != this.producto.prod_precioVenta){
        this.producto.createdAt = (new Date()).toString();
        this.productoService.updateProducto(this.idProducto, this.producto)
        .subscribe(
        async ok => {
          if (ok == true && this.formProducto.valid) {
            

            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Exito',
              message: "Se guardo con exito",
              buttons: ['OK']
            });
            await alert.present();
      
            const { role } = await alert.onDidDismiss();
            

            this.historialProducto.id_producto = this.producto.id_Producto;
            this.historialProducto.hist_modelo = this.producto.prod_modelo;
            this.historialProducto.hist_descripcion = this.producto.prod_descripcion;
            this.historialProducto.hist_caracteristica = this.producto.prod_caracteristica;
            this.historialProducto.hist_stock = this.producto.prod_stock;
            this.historialProducto.hist_imagen = this.producto.prod_imagen;
            this.historialProducto.hist_activo = this.producto.prod_activo;
            this.historialProducto.hist_precioVenta = this.producto.prod_precioVenta;
            this.historialProducto.hist_activo = this.producto.prod_activo;
            this.historialProducto.fk_id_categoria = this.producto.fk_id_categoria;
            this.historialProducto.fk_id_marca = this.producto.fk_id_marca;
            this.historialProducto.fk_id_medida = this.producto.fk_id_medida;
            this.historialProducto.fk_id_tipo = this.producto.fk_id_tipo;
            this.historialProducto.fk_id_usuario = this.usuario.uid;

            this.historialProductoService.saveHistorialProducto(this.historialProducto)
            .subscribe(ok =>{
              if( ok == true ) {
                console.log("Historial guardado")
                this.dismissModal('Guardado');
              }
              else{
                console.log("Historial - error guardado")
              }
            })

          }
          else{
            this.formProducto.markAllAsTouched();
            this.formProducto.markAllAsTouched();
            console.log(ok);
              const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Alerta',
                message: ok,
                buttons: ['OK']
              });
      
            await alert.present();
      
            const { role } = await alert.onDidDismiss();
          }
          
        });
      }
      else{

        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Alerta',
          message: "Por favor edite el campo de Precio",
          buttons: ['OK']
        });

        await  alert.present();

        const { role } = await alert.onDidDismiss();
      }
      
    }
    else{
      this.productoService.updateProducto(this.idProducto, this.producto)
      .subscribe(
        async ok => {
          if (this.formProducto.valid) {
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Exito',
              message: "Se guardo con exito",
              buttons: ['OK']
            });
            await alert.present();
      
            const { role } = await alert.onDidDismiss();
            

            this.historialProducto.id_producto = this.producto.id_Producto;
            this.historialProducto.hist_modelo = this.producto.prod_modelo;
            this.historialProducto.hist_descripcion = this.producto.prod_descripcion;
            this.historialProducto.hist_caracteristica = this.producto.prod_caracteristica;
            this.historialProducto.hist_stock = this.producto.prod_stock;
            this.historialProducto.hist_imagen = this.producto.prod_imagen;
            this.historialProducto.hist_activo = this.producto.prod_activo;
            this.historialProducto.hist_precioVenta = this.producto.prod_precioVenta;
            this.historialProducto.hist_activo = this.producto.prod_activo;
            this.historialProducto.fk_id_categoria = this.producto.fk_id_categoria;
            this.historialProducto.fk_id_marca = this.producto.fk_id_marca;
            this.historialProducto.fk_id_medida = this.producto.fk_id_medida;
            this.historialProducto.fk_id_tipo = this.producto.fk_id_tipo;

            this.historialProductoService.saveHistorialProducto(this.historialProducto)
            .subscribe(ok =>{
              if( ok == true ) {
                console.log("Historial guardado")
                this.dismissModal('Guardado');
              }
              else{
                console.log("Error - Historial no guardado")
              }
            })
          }
          else{
            this.formProducto.markAllAsTouched();
            console.log(ok);
              const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Alerta',
                message: ok,
                buttons: ['OK']
              });
          
              await alert.present();
          
              const { role } = await alert.onDidDismiss();
              
          }
          
    });
    }
    
  }

  get usuario(){
    return this.authService.usuario;
  } 

  submit(){

  }

  async abrirModalCategoria(){
    const modalCategoria = await this.modalCtrl.create({
      component: FormCategoriaPage,
      cssClass: 'my-custom-class',
      
    });
    await modalCategoria.present();

    const { data } = await modalCategoria.onWillDismiss();
    console.log(data);
    if(data == "Guardado"){
      console.log("entro a guardado")
      this.getCategoria();
    }
  }

  async abrirModalModal(){
    const modalMarca = await this.modalCtrl.create({
      component: FormMarcaPage,
      cssClass: 'my-custom-class',
      
    });
    await modalMarca.present();

    const { data } = await modalMarca.onWillDismiss();
    console.log(data);
    if(data == "Guardado"){
      console.log("entro a guardado")
      this.getMarca();
    }
  }

  async deleteProducto(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación',
      message: 'Esta seguro de eliminar el producto?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.prductoService.deleteProducto(this.idProducto).subscribe(
              async res=> {
                this.getProductos();
                const alert = await this.alertController.create({
                  cssClass: 'my-custom-class',
                  header: 'Exito',
                  message: "Se elimino con exito",
                  buttons: ['OK']
                });
                await alert.present();
          
                const { role } = await alert.onDidDismiss();
                
                this.dismissModal('Guardado');
                  
              },
              err => console.log(err)
              
            );
          }
        }
      ]
    });

    await alert.present();
  }
}
