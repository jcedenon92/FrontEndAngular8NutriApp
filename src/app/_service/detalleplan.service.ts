import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DetallePlan } from '../_model/detalleplan';

@Injectable({
  providedIn: 'root'
})
export class DetalleplanService {

  url : string = `${environment.HOST}/detalleplan`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<DetallePlan[]>(this.url);
  }
}
