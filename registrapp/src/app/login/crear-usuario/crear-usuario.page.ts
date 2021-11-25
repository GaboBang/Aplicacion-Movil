import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';

import { debounceTime } from 'rxjs/operators'
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

import { Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service'; 
import { formatNumber } from '@angular/common';



@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  ionicForm: FormGroup;
  defaultDate = "1987-06-30";
  isSubmitted = false;
  Usuarios = [];
  
  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController, 
      private router : Router,
      private usuarioService: UsuarioService,
      ) { 
        this.buildForm();
      }

  ngOnInit() { 
  }

  private buildForm(){
    this.ionicForm = this.formBuilder.group({
      usuario:['', [Validators.required, Validators.minLength(2),Validators.maxLength(15)]],
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required,Validators.minLength(8)]],
      Rpassword: ['',[Validators.required]]
    }); 
  }
  save(envent:Event){
    event.preventDefault();
    if(this.ionicForm.valid){
      const value = this.ionicForm.value;
      console.log(value)
    }
  }

  /* GUARDAR DATOS */
  async agregarUsuario(usuario,email,password,Rpassword) {
    //VALIDACION FORMULARIO
    if (this.ionicForm.valid)
    { 
      //VALIDACION CONTRASEÑA
      if(password.value == Rpassword.value){
        //SE CREA VARIABLE USER COND DATOS DE MI FORMULARIO
        const user = {
          usuario : usuario.value,
          password : password.value,
          email : email.value 
        };
        //SE LLAMA METODO DE SERVICE PARA AGREGAR USUARIO A LA API
        this.usuarioService.crearUsuario(user)
        .subscribe((nuevoUsuario) => {
          console.log(nuevoUsuario)
        }) ;
        //SE CREA CARGA
        const loading = await this.loadingController.create({
          spinner: 'bubbles',
          duration: 500,
          message: 'Cargando Espere',
          translucent: true,
          cssClass: 'custom-class custom-loading',
          backdropDismiss: true
        });
        await loading.present();
        //SE VUELVE A LA PAGINA PRINCIPAL
        this.router.navigate(['/login']);
      }
      //SI NO SON IGUALES LAS CONTRASEÑAS
      else{
        const alert = document.createElement('ion-alert');
        alert.header = 'Las contraseñas no son iguales';
        alert.message = 'Debes volver a rellenar la contraseña';
        alert.buttons = ['OK'];
      
        document.body.appendChild(alert);
        await alert.present();
        
        const { role } = await alert.onDidDismiss();
        console.log('onDidDismiss resolved with role', role);
        }
        
    }
    else{
      //SI EL FOORMULARIO NO ES VALIDO
      const alert = document.createElement('ion-alert');
      alert.header = 'Error al ingresar los datos';
      alert.message = 'Debe rellenar todos los campos';
      alert.buttons = ['OK'];
    
      document.body.appendChild(alert);
      await alert.present();
    
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
  }

  /* LOADING BACK LOGIN */
  async loadingBack() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      duration: 500,
      message: 'Cargando Espere',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
    this.router.navigate(['/login'])
  }



} 
