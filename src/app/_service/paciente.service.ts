import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Paciente } from '../_model/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  url : string = `${environment.HOST}/pacientes`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Paciente[]>(this.url);
  }
}
