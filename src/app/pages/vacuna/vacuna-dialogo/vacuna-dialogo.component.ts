import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { Vacuna } from 'src/app/_model/vacuna';
import { VacunaService } from 'src/app/_service/vacuna.service';

@Component({
  selector: 'app-vacuna-dialogo',
  templateUrl: './vacuna-dialogo.component.html',
  styleUrls: ['./vacuna-dialogo.component.css']
})
export class VacunaDialogoComponent implements OnInit {

  vacuna : Vacuna;

  constructor(
    private dialogRef: MatDialogRef<VacunaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Vacuna,
    private vacunaService: VacunaService
    ) { }

  ngOnInit() {
    this.vacuna = new Vacuna();
    this.vacuna.idVacuna = this.data.idVacuna;
    this.vacuna.nombre = this.data.nombre;
  }

  operar(){
    if(this.vacuna != null && this.vacuna.idVacuna > 0){
      //MODIFICAR
      //BUENA PRACTICA CON OBSERVABLE Y PROG. REACTIVA
      this.vacunaService.modificar(this.vacuna).pipe(switchMap( () =>{
        return this.vacunaService.listar();
      })).subscribe(data => {
        this.vacunaService.vacunaCambio.next(data);
        this.vacunaService.mensajeCambio.next("SE MODIFICO");
      });
    } else{
      //REGISTRAR
      //PRACTICA COMUN
      this.vacunaService.registrar(this.vacuna).subscribe( () =>{
        this.vacunaService.listar().subscribe(data => {
          this.vacunaService.vacunaCambio.next(data);
          this.vacunaService.mensajeCambio.next("SE REGISTRO");
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar(){
    this.dialogRef.close();
  }
}
