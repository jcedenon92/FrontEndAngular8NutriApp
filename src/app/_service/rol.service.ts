import { Rol } from '../_model/paciente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  //VARIABLE REACTIVA!!!
  rolCambio = new Subject<Rol[]>();
  mensajeCambio = new Subject<string>();

  url : string = `${environment.HOST}/roles`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Rol[]>(this.url);
  }

  listarPorId(idRol: number){
    return this.http.get<Rol>(`${this.url}/${idRol}`);
  }

  //POST
  registrar(rol: Rol){
    return this.http.post(this.url, rol);
  }

  //PUT
  modificar(rol: Rol){
    return this.http.put(this.url, rol);
  }

  //DELETE
  eliminar(idRol: number) {
    return this.http.delete(`${this.url}/${idRol}`);
  }
}
