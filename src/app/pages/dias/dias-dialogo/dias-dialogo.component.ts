import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { Dias } from 'src/app/_model/dias';
import { DiasService } from 'src/app/_service/dias.service';

@Component({
  selector: 'app-dias-dialogo',
  templateUrl: './dias-dialogo.component.html',
  styleUrls: ['./dias-dialogo.component.css']
})
export class DiasDialogoComponent implements OnInit {

  dias: Dias;

  constructor(
    private dialogRef: MatDialogRef<DiasDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Dias,
    private diasService: DiasService) { }

  ngOnInit() {
    this.dias = new Dias();
    this.dias.idDias = this.data.idDias;
    this.dias.nombre = this.data.nombre;
  }

  operar(){
    if(this.dias != null && this.dias.idDias > 0){
      //MODIFICAR
      //BUENA PRACTICA CON OBSERVABLE Y PROG. REACTIVA
      this.diasService.modificar(this.dias).pipe(switchMap( () =>{
        return this.diasService.listar();
      })).subscribe(data => {
        this.diasService.diasCambio.next(data);
        this.diasService.mensajeCambio.next("SE MODIFICO");
      });
    } else{
      //REGISTRAR
      //PRACTICA COMUN
      this.diasService.registrar(this.dias).subscribe( () =>{
        this.diasService.listar().subscribe(data => {
          this.diasService.diasCambio.next(data);
          this.diasService.mensajeCambio.next("SE REGISTRO");
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar(){
    this.dialogRef.close();
  }

}
