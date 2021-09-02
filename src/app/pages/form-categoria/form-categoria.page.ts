import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Categoria } from 'src/app/interfaces/Categoria';
import { CategoriasService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.page.html',
  styleUrls: ['./form-categoria.page.scss'],
})
export class FormCategoriaPage implements OnInit {

  formCategoria = new FormGroup({
    firstName: new FormControl(),
    descripcionCategoria: new FormControl(),
    activoCategoria : new FormControl() 
  });

  inputValue?: string;
  edit: boolean = false;
  switchValue = false;
  checked = true;

  categoria: Categoria = {
    id_categoria: 0,
    cat_nombre: '',
    cat_descripcion: '',
    cat_activo: ''
  };
  toppings: FormGroup;

  constructor(private modalCtrl:ModalController,
    private categoriaService: CategoriasService,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  dismissModalCategoria(mensaje:any){
    this.modalCtrl.dismiss(mensaje);
  }
  

  saveNewCategoria(){
    this.categoriaService.saveCategoria(this.categoria)
      .subscribe(
        async ok=>{
          if (ok == true && this.formCategoria.valid) {
            

            this.formCategoria.reset();
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Exito',
              message: 'Se guardo la Categoria',
              buttons: ['OK']
            });
        
            await alert.present();
        
            const { role } = await alert.onDidDismiss();

            this.dismissModalCategoria('Guardado');
          }
          else{
            this.formCategoria.markAllAsTouched();
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

  updateCategoria(){

  }
  submit(){

  }
}
