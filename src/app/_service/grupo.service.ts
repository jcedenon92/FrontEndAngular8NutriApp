import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grupo } from '../_model/grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  //VARIABLE REACTIVA!!!
  grupoCambio = new Subject<Grupo[]>();
  mensajeCambio = new Subject<string>();

  url : string = `${environment.HOST}/grupos`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Grupo[]>(this.url);
  }

  listarPorId(idGrupo: number){
    return this.http.get<Grupo>(`${this.url}/${idGrupo}`);
  }

  //POST
  registrar(grupo: Grupo){
    return this.http.post(this.url, grupo);
  }

  //PUT
  modificar(grupo: Grupo){
    return this.http.put(this.url, grupo);
  }

  //DELETE
  eliminar(idGrupo: number) {
    return this.http.delete(`${this.url}/${idGrupo}`);
  }


}
