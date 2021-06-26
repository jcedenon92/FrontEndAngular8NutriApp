import { TurnocomidaComponent } from './pages/turnocomida/turnocomida.component';
import { GrupoComponent } from './pages/grupo/grupo.component';
import { RolComponent } from './pages/rol/rol.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolEdicionComponent } from './pages/rol/rol-edicion/rol-edicion.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
