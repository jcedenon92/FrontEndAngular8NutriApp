import { Subject } from 'rxjs';
import { TurnoComida } from './../_model/turnocomida';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnocomidaService {

  //VARIABLE REACTIVA!!
  turnocomidaCambio = new Subject<TurnoComida[]>();
  mensajeCambio = new Subject<string>();

  url : string = `${environment.HOST}/turnocomidas`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<TurnoComida[]>(this.url);
  }

  listarPorId(idTurnoComida: number){
    return this.http.get<TurnoComida>(`${this.url}/${idTurnoComida}`);
  }

  //POST
  registrar(turnocomida: TurnoComida){
    return this.http.post(this.url, turnocomida);
  }

  //PUT
  modificar(turnocomida: TurnoComida){
    return this.http.put(this.url, turnocomida);
  }

  //DELETE
  eliminar(idTurnoComida: number){
    return this.http.delete(`${this.url}/${idTurnoComida}`);
  }


}
