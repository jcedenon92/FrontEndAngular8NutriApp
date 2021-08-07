import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alimento } from '../_model/alimento';

@Injectable({
  providedIn: 'root'
})
export class AlimentoService {

  //VARIABLE REACTIVA!!!
  alimentoCambio = new Subject<Alimento[]>();
  mensajeCambio = new Subject<string>();

  url : string = `${environment.HOST}/alimentos`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Alimento[]>(this.url);
  }

  listarPorId(idAlimento: number){
    return this.http.get<Alimento>(`${this.url}/${idAlimento}`);
  }

  //POST
  registrar(alimento: Alimento){
    return this.http.post(this.url, alimento);
  }

  //PUT
  modificar(alimento: Alimento){
    return this.http.put(this.url, alimento);
  }

  //DELETE
  eliminar(idAlimento: number){
    return this.http.delete(`${this.url}/${idAlimento}`);
  }
}
