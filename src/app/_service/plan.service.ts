import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan } from '../_model/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  //VARIABLES REACTIVAS!!
  planCambio = new Subject<Plan[]>();
  mensajeCambio = new Subject<string>();

  url : string = `${environment.HOST}/planes`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Plan[]>(this.url);
  }

  listarPorId(idPlan: number){
    return this.http.get<Plan>(`${this.url}/${idPlan}`);
  }

  //POST
  registrar(plan: Plan){
    return this.http.post(this.url, plan);
  }

  //PUT
  modificar(plan: Plan){
    return this.http.put(this.url, plan);
  }

  //DELETE
  eliminar(idPlan: number) {
    return this.http.delete(`${this.url}/${idPlan}`);
  }
}
