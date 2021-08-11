import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = `${environment.HOST}/oauth/token`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(usuario: string, contrasena: string) {
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;

    return this.http.post<any>(this.url, body, {
      // tslint:disable-next-line: max-line-length
      headers: new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  estaLogeado() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }
}
