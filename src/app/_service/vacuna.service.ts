import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vacuna } from '../_model/vacuna';

@Injectable({
  providedIn: 'root'
})
export class VacunaService {

  //VARIABLES REACTIVAS!!
  vacunaCambio = new Subject<Vacuna[]>();
  mensajeCambio = new Subject<string>();

  url : string = `${environment.HOST}/vacunas`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Vacuna[]>(this.url);
  }

  listarPorId(idVacuna: number){
    return this.http.get<Vacuna>(`${this.url}/${idVacuna}`);
  }

  //POST
  registrar(vacuna: Vacuna){
    return this.http.post(this.url, vacuna);
  }

  //PUT
  modificar(vacuna: Vacuna){
    return this.http.put(this.url, vacuna);
  }

  //DELETE
  eliminar(idVacuna: number) {
    return this.http.delete(`${this.url}/${idVacuna}`);
  }
}
