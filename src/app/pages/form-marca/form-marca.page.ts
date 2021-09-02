import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Marca } from 'src/app/interfaces/Marca';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-form-marca',
  templateUrl: './form-marca.page.html',
  styleUrls: ['./form-marca.page.scss'],
})
export class FormMarcaPage implements OnInit {

  formMarca = new FormGroup({
    nombreMarca: new FormControl(),
    descripcionMarca: new FormControl(),
    pepperoni : new FormControl() 
  });

  inputValue?: string;
  edit: boolean = false;
  switchValue = false;
  checked = true;
  marca: Marca = {
    id_marca: 0,
    mar_nombre: '',
    mar_descripcion: '',
    mar_activo: ''
  };
  toppings: FormGroup;
  constructor(private marcaService: MarcaService,
    private modalCtrl:ModalController,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  dismissModalMarca(mensaje:any){
    this.modalCtrl.dismiss(mensaje);
  }
  

  saveNewMarca(){
    const value = this.formMarca.value;
        this.marcaService.saveMarca(this.marca)
      .subscribe(
        async ok=>{
          if (ok== true && this.formMarca.valid) {
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Exito',
              message: 'Se guardo la Marca',
              buttons: ['OK']
            });
        
            await alert.present();
        
            const { role } = await alert.onDidDismiss();

            this.dismissModalMarca('Guardado');
            
          }
          else{
            this.formMarca.markAllAsTouched();
            
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
