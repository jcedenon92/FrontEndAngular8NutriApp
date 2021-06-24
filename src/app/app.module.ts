import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RolComponent } from './pages/rol/rol.component';
import { HttpClientModule } from '@angular/common/http';
import { GrupoComponent } from './pages/grupo/grupo.component';

@NgModule({
  declarations: [
    AppComponent,
    RolComponent,
    GrupoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
