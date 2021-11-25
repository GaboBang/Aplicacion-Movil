import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {

  ionicForm: FormGroup;
  defaultDate = "1987-06-30";
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder,public loadingController: LoadingController, private router:Router) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(15)]],
    })
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('dob').setValue(date, {
      onlyself: true
    })
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
    }
  }


/* LOADING VALIDADOR */
  async presentLoadingWithOptionsRecuperar() {
    if (this.ionicForm.valid)
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
      this.router.navigate(['/login'])
    }
    else{
      const alert = document.createElement('ion-alert');
      alert.header = 'Error al ingresar usuario';
      alert.message = 'Debe ingresar un usuario';
      alert.buttons = ['OK'];
    
      document.body.appendChild(alert);
      await alert.present();
    
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
  }

/* LOADING BACK */
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