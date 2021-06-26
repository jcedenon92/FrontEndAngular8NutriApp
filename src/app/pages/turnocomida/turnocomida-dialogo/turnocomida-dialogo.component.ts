import { switchMap } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { TurnoComida } from 'src/app/_model/turnocomida';
import { TurnocomidaService } from 'src/app/_service/turnocomida.service';


@Component({
  selector: 'app-turnocomida-dialogo',
  templateUrl: './turnocomida-dialogo.component.html',
  styleUrls: ['./turnocomida-dialogo.component.css']
})
export class TurnocomidaDialogoComponent implements OnInit {

  turnocomida : TurnoComida;

  constructor(
    private dialogRef: MatDialogRef<TurnocomidaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TurnoComida,
    private turnocomidaService: TurnocomidaService
  ) { }

  ngOnInit() {
    this.turnocomida = new TurnoComida();
    this.turnocomida.idTurnoComida = this.data.idTurnoComida;
    this.turnocomida.nombre = this.data.nombre;
  }

  operar(){
    if(this.turnocomida != null && this.turnocomida.idTurnoComida > 0) {
      //BUENA PRACTICA PARA OBSERVABLE
      this.turnocomidaService.modificar(this.turnocomida).pipe(switchMap( () =>{
        return this. turnocomidaService.listar();
      })).subscribe(data => {
        this.turnocomidaService.turnocomidaCambio.next(data);
        this.turnocomidaService.mensajeCambio.next('SE MODIFICO');
      })
    } else{
      this.turnocomidaService.registrar(this.turnocomida).subscribe( () =>{
        this.turnocomidaService.listar().subscribe(data => {
          this.turnocomidaService.turnocomidaCambio.next(data);
          this.turnocomidaService.mensajeCambio.next("SE REGISTRO");
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar(){
    this.dialogRef.close();
  }

}
