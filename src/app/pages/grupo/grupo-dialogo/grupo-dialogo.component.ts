import { Grupo } from './../../../_model/grupo';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { GrupoService } from 'src/app/_service/grupo.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-grupo-dialogo',
  templateUrl: './grupo-dialogo.component.html',
  styleUrls: ['./grupo-dialogo.component.css']
})
export class GrupoDialogoComponent implements OnInit {

  grupo : Grupo;

  constructor(
    private dialogRef: MatDialogRef<GrupoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Grupo,
    private grupoService: GrupoService
  ) { }

  ngOnInit() {
    this.grupo = new Grupo();
    this.grupo.idGrupo = this.data.idGrupo;
    this.grupo.nombre = this.data.nombre;
  }

  operar(){
    if(this.grupo != null && this.grupo.idGrupo > 0){
      //MODIFICAR
      //BUENA PRACTICA CON OBSERVABLE Y PROG. REACTIVA
      this.grupoService.modificar(this.grupo).pipe(switchMap( () =>{
        return this.grupoService.listar();
      })).subscribe(data => {
        this.grupoService.grupoCambio.next(data);
        this.grupoService.mensajeCambio.next("SE MODIFICO");
      });
    } else{
      //REGISTRAR
      //PRACTICA COMUN
      this.grupoService.registrar(this.grupo).subscribe( () =>{
        this.grupoService.listar().subscribe(data => {
          this.grupoService.grupoCambio.next(data);
          this.grupoService.mensajeCambio.next("SE REGISTRO");
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar(){
    this.dialogRef.close();
  }

}
