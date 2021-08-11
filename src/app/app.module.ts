import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RolComponent } from './pages/rol/rol.component';
import { HttpClientModule } from '@angular/common/http';
import { GrupoComponent } from './pages/grupo/grupo.component';
import { MaterialModule } from './material/material.module';
import { RolEdicionComponent } from './pages/rol/rol-edicion/rol-edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrupoDialogoComponent } from './pages/grupo/grupo-dialogo/grupo-dialogo.component';
import { TurnocomidaComponent } from './pages/turnocomida/turnocomida.component';
import { TurnocomidaDialogoComponent } from './pages/turnocomida/turnocomida-dialogo/turnocomida-dialogo.component';
import { VacunaComponent } from './pages/vacuna/vacuna.component';
import { VacunaDialogoComponent } from './pages/vacuna/vacuna-dialogo/vacuna-dialogo.component';
import { DiasComponent } from './pages/dias/dias.component';
import { DiasDialogoComponent } from './pages/dias/dias-dialogo/dias-dialogo.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuarioDialogoComponent } from './pages/usuario/usuario-dialogo/usuario-dialogo.component';
import { AlimentoComponent } from './pages/alimento/alimento.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { DosisComponent } from './pages/dosis/dosis.component';
import { ControlComponent } from './pages/control/control.component';
import { PlanComponent } from './pages/plan/plan.component';
import { DetalleplanComponent } from './pages/detalleplan/detalleplan.component';
import { AlimentoDialogoComponent } from './pages/alimento/alimento-dialogo/alimento-dialogo.component';
import { ControlDialogoComponent } from './pages/control/control-dialogo/control-dialogo.component';
import { DosisDialogoComponent } from './pages/dosis/dosis-dialogo/dosis-dialogo.component';
import { PrediccionComponent } from './pages/prediccion/prediccion.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

export function tokenGetter(){
  let tk = sessionStorage.getItem(environment.TOKEN_NAME);
  return tk != null ? tk : '';
}

@NgModule({
  declarations: [
    AppComponent,
    RolComponent,
    GrupoComponent,
    RolEdicionComponent,
    GrupoDialogoComponent,
    TurnocomidaComponent,
    TurnocomidaDialogoComponent,
    VacunaComponent,
    VacunaDialogoComponent,
    DiasComponent,
    DiasDialogoComponent,
    UsuarioComponent,
    UsuarioDialogoComponent,
    AlimentoComponent,
    PacienteComponent,
    DosisComponent,
    ControlComponent,
    PlanComponent,
    DetalleplanComponent,
    AlimentoDialogoComponent,
    ControlDialogoComponent,
    DosisDialogoComponent,
    PrediccionComponent,
    ReporteComponent,
    LoginComponent
  ],
  entryComponents: [
    GrupoDialogoComponent,
    TurnocomidaDialogoComponent,
    VacunaDialogoComponent,
    DiasDialogoComponent,
    AlimentoDialogoComponent,
    ControlDialogoComponent,
    DosisDialogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/login/enviarCorreo']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
