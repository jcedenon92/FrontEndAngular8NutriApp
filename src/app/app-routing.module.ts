import { TurnocomidaComponent } from './pages/turnocomida/turnocomida.component';
import { GrupoComponent } from './pages/grupo/grupo.component';
import { RolComponent } from './pages/rol/rol.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolEdicionComponent } from './pages/rol/rol-edicion/rol-edicion.component';
import { VacunaComponent } from './pages/vacuna/vacuna.component';
import { DiasComponent } from './pages/dias/dias.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AlimentoComponent } from './pages/alimento/alimento.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { DosisComponent } from './pages/dosis/dosis.component';
import { ControlComponent } from './pages/control/control.component';
import { PlanComponent } from './pages/plan/plan.component';
import { DetalleplanComponent } from './pages/detalleplan/detalleplan.component';
import { PrediccionComponent } from './pages/prediccion/prediccion.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { LoginComponent } from './pages/login/login.component';

//Sistema de rutas
const routes: Routes = [
  {
    path: 'rol', component: RolComponent, children: [
      { path: 'nuevo', component: RolEdicionComponent },
      { path: 'edicion/:id', component: RolEdicionComponent }
    ]
  },
  {
    path: 'grupo', component: GrupoComponent
  },
  {
    path: 'turnocomida', component: TurnocomidaComponent
  },
  {
    path: 'vacuna', component: VacunaComponent
  },
  {
    path: 'dia', component: DiasComponent
  },
  {
    path: 'usuario', component: UsuarioComponent
  },
  {
    path: 'alimento', component: AlimentoComponent
  },
  {
    path: 'paciente', component: PacienteComponent
  },
  {
    path: 'dosis', component: DosisComponent
  },
  {
    path: 'control', component: ControlComponent
  },
  {
    path: 'plan', component: PlanComponent
  },
  {
    path: 'detalleplan', component: DetalleplanComponent
  },
  {
    path: 'prediccion', component: PrediccionComponent
  },
  {
    path: 'reporte', component: ReporteComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
