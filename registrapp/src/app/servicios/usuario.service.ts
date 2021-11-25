import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Usuario } from '../modelos/usuario.interface';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'http://127.0.0.1:8000/api/usuario/'

  constructor(private http: HttpClient) { }


  //cargamos usuarios
  cargarUsuarios(): Observable<any> {
    return this.http.get<Usuario[]>(this.url)
  }
  //CARGAR 1 USUARIO
  cargarUsuario(id: string){
    return this.http.get<Usuario>(this.url+id)
  }

  //CREARMOS UN USUARIO
  crearUsuario(usuario: Usuario){
   return this.http.post(this.url, usuario)
 }

 //Modificar usuarios
 modificarUsuario(usuario: Usuario) {
   return this.http.put<Usuario>(this.url, usuario)
 }
 
 //ELIMINAR USUARIO
borrarUsuario(id: string) {
  return this.http.delete(this.url)
}

}
