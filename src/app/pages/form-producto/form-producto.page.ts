import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/Producto';
import { CategoriasService } from 'src/app/services/categoria.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TipoProductoService } from 'src/app/services/tipo-producto.service';
import { UnidadMedidaService } from 'src/app/services/unidad-medida.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.page.html',
  styleUrls: ['./form-producto.page.scss'],
})
export class FormProductoPage implements OnInit {
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

  constructor(private marcaService: MarcaService, 
    private productoService: ProductosService, 
    private categoriaService: CategoriasService,
    private medidaService: UnidadMedidaService, 
    private tipoProductoService: TipoProductoService, 
    private router: Router, 
    private modalCtrl:ModalController) { }

  ngOnInit() {

    this.getCategoria();
    this.getMarca();
    this.getMedida();
    this.getTipoProducto();
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

  dismissModal() {
    this.modalCtrl.dismiss('cerrado');
    
  }

  saveNewProducto(){

    console.log(this.producto);
    
    this.productoService.saveProducto(this.producto)
    .subscribe(ok =>{
      

      if( ok == true ) {
        
        this.dismissModal();
        

      }
      else{
        
        
      }
      
    });
  }

  submit(){

  }
}
