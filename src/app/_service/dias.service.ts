import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dias } from '../_model/dias';

@Injectable({
  providedIn: 'root'
})
export class DiasService {

  //VARIABLE REACTIVA!!!
  diasCambio = new Subject<Dias[]>();
  mensajeCambio = new Subject<string>();

  url : string = `${environment.HOST}/dias`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Dias[]>(this.url);
  }

  listarPorId(idDias: number){
    return this.http.get<Dias>(`${this.url}/${idDias}`);
  }

  //POST
  registrar(dias: Dias){
    return this.http.post(this.url, dias);
  }

  //PUT
  modificar(dias: Dias){
    return this.http.put(this.url, dias);
  }

  //DELETE
  eliminar(idDias: number) {
    return this.http.delete(`${this.url}/${idDias}`);
  }
}
