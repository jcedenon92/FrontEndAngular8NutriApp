import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ControlResumenDTO } from '../_dto/controlResumenDTO';
import { Control } from '../_model/control';

@Injectable({
  providedIn: 'root'
})

export class ControlService {

  //VARIABLES REACTIVAS!!
  controlCambio = new Subject<Control[]>();
  mensajeCambio = new Subject<string>();

  url : string = `${environment.HOST}/controles`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Control[]>(this.url);
  }

  listarPorId(idControl: number){
    return this.http.get<Control>(`${this.url}/${idControl}`);
  }

  //POST
  registrar(control: Control){
    return this.http.post(this.url, control);
  }

  //PUT
  modificar(control: Control){
    return this.http.put(this.url, control);
  }

  //DELETE
  eliminar(idControl: number) {
    return this.http.delete(`${this.url}/${idControl}`);
  }

  listarResumen(){
    return this.http.get<ControlResumenDTO[]>(`${this.url}/listarResumen`);
  }
}
