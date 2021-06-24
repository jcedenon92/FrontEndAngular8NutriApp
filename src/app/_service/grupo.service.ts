import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Grupo } from '../_model/grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  url: string = `${environment.HOST}/grupos`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Grupo[]>(this.url);
  }
}
