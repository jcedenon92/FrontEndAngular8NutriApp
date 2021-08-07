import { DosisService } from 'src/app/_service/dosis.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dosis } from 'src/app/_model/dosis';
import { switchMap } from 'rxjs/operators';
import { Vacuna } from 'src/app/_model/vacuna';

@Component({
  selector: 'app-dosis-dialogo',
  templateUrl: './dosis-dialogo.component.html',
  styleUrls: ['./dosis-dialogo.component.css']
})
export class DosisDialogoComponent implements OnInit {

  dosis : Dosis;
  vacuna : Vacuna;

  constructor(
    private dialogRef: MatDialogRef<DosisDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Dosis,
    private dosisService: DosisService
  ) { }

  ngOnInit() {
    this.dosis = new Dosis();
    this.dosis.idDosis = this.data.idDosis;
    this.dosis.fechaMes = this.data.fechaMes;
    this.dosis.vacuna.nombre = this.data.vacuna.nombre;
  }

  operar(){
    if(this.dosis != null && this.dosis.idDosis > 0){
      //MODIFICAR
      //BUENA PRACTICA CON OBSERVABLE Y PROG. REACTIVA
      this.dosisService.modificar(this.dosis).pipe(switchMap( () =>{
        return this.dosisService.listar();
      })).subscribe(data => {
        this.dosisService.dosisCambio.next(data);
        this.dosisService.mensajeCambio.next("SE MODIFICO");
      });
    } else{
      //REGISTRAR
      //PRACTICA COMUN
      this.dosisService.registrar(this.dosis).subscribe( () =>{
        this.dosisService.listar().subscribe(data => {
          this.dosisService.dosisCambio.next(data);
          this.dosisService.mensajeCambio.next("SE REGISTRO");
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar(){
    this.dialogRef.close();
  }

}
