import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Prediccion } from '../_model/prediccion';

@Injectable({
  providedIn: 'root'
})
export class PrediccionService {

  url : string = `${environment.HOST2}/prediccion`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Prediccion[]>(this.url);
  }

  listarPorId(idPrediccion: number){
    return this.http.get<Prediccion>(`${this.url}/${idPrediccion}`);
  }

  //POST
  predecir(prediccion: Prediccion){
    return this.http.post(this.url, prediccion);
  }
}
