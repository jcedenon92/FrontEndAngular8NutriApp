import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from 'src/app/_service/login.service.js';
import { MenuService } from 'src/app/_service/menu.service.js';
import { environment } from 'src/environments/environment.js';
import '../../login-animation.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  clave: string;
  mensaje: string;
  error: string;

  constructor(
    private loginService: LoginService,
    private menuService : MenuService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  iniciarSesion(){
    this.loginService.login(this.usuario, this.clave).subscribe(data => {
      console.log(data);

      //const helper = new JwtHelperService();
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

      //let decodedToken = helper.decodeToken(data.access_token);
      //console.log(decodedToken);

      //this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
        //this.menuService.menuCambio.next(data);
        this.router.navigate(['control']);
      //});
    });
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

}
