import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dosis } from '../_model/dosis';

@Injectable({
  providedIn: 'root'
})
export class DosisService {

  //VARIABLES REACTIVAS!!
  dosisCambio = new Subject<Dosis[]>();
  mensajeCambio = new Subject<string>();

  url : string = `${environment.HOST}/dosis`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Dosis[]>(this.url);
  }

  listarPorId(idDosis: number){
    return this.http.get<Dosis>(`${this.url}/${idDosis}`);
  }

  //POST
  registrar(dosis: Dosis){
    return this.http.post(this.url, dosis);
  }

  //PUT
  modificar(dosis: Dosis){
    return this.http.put(this.url, dosis);
  }

  //DELETE
  eliminar(idDosis: number) {
    return this.http.delete(`${this.url}/${idDosis}`);
  }
}
