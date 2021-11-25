import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    children:[
      {
        path:"",
        loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
      },
      {
        path:"recuperar-clave",
        loadChildren: () => import('./login/recuperar-contrasena/recuperar-contrasena.module').then(m => m.RecuperarContrasenaPageModule)

      },
    ]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
