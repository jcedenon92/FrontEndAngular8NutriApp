import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rol } from '../_model/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url : string = `${environment.HOST}/roles`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Rol[]>(this.url);
  }
}
