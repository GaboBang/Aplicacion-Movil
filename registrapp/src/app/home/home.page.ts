import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public loadingController: LoadingController, private router:Router) { }

  ngOnInit() {
  }

  async presentLoadingWithOptionsLogOut() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      duration: 500,
      message: 'Cerrando Sesion',
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
