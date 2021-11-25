import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  ionicForm: FormGroup;
  
  defaultDate = "1987-06-30";
  isSubmitted = false; 
  usuario : string ="";
  password : string = "";

  usera = [];
  asda = 0;
  
  usuarioBdd = [];

  constructor(public formBuilder: FormBuilder,
    public loadingController: LoadingController, 
    private router:Router,
     private usuarioService: UsuarioService ) 
     { 
      this.buildForm()

  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(15)]],
      password: ['', [Validators.required,Validators.minLength(8)]],
    })
  }
    
  private buildForm(){
    this.ionicForm = this.formBuilder.group({
      usuario:['', [Validators.required, Validators.minLength(2),Validators.maxLength(15)]],
      password:['', [Validators.required,Validators.minLength(8)]]
    })
  }
  save(envent:Event){
    event.preventDefault();
    if(this.ionicForm.valid){
      const value = this.ionicForm.value;
      console.log(value)
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


/* LOADING RECUPERAR CONTRRASEÑA */
  async presentLoadingWithOptionsRecuperar() {
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
    

  }
  /* LOADING CREAR USUARIO */
  async presentLoadingWithOptionsCrear() {
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
    this.router.navigate(['/login/crear-usuario'])

  }
  /* LOADING GO HOME */
  async presentLoadingWithOptionsIngresar(User,Password) {

        this.usuarioService.cargarUsuarios()
        .subscribe(usuario => {
          this.usuarioBdd = Object.values(usuario)
          this.usera = this.usuarioBdd[1];
          this.asda =  this.usera.length;
          })
        console.log(this.usera)
        console.log(this.asda)
        
        for(let i = 0;i < this.asda;i++){
  
          if(this.usera[i].usuario === User.value){
            if(this.usera[i].password === Password.value)
            {
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
              this.router.navigate(['/home'])
            }
          }
        }
   }
}
