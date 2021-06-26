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

@NgModule({
  declarations: [
    AppComponent,
    RolComponent,
    GrupoComponent,
    RolEdicionComponent,
    GrupoDialogoComponent
  ],
  entryComponents: [GrupoDialogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
