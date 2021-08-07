import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { Control } from 'src/app/_model/control';
import { ControlService } from 'src/app/_service/control.service';

@Component({
  selector: 'app-control-dialogo',
  templateUrl: './control-dialogo.component.html',
  styleUrls: ['./control-dialogo.component.css']
})
export class ControlDialogoComponent implements OnInit {

  control : Control;

  maxFecha: Date = new Date();

  fechaSeleccionada: Date = new Date();

  constructor(
    private dialogRef: MatDialogRef<ControlDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Control,
    private controlService: ControlService
  ) { }

  ngOnInit() {
    this.control = new Control();
    this.control.idControl = this.data.idControl;
    this.control.fechaControl = this.data.fechaControl;
    this.control.edadMes = this.data.edadMes;
    this.control.peso = this.data.peso;
    this.control.estatura = this.data.estatura;
    this.control.cabeza = this.data.cabeza;
    this.control.observacion = this.data.observacion;
    this.control.paciente = this.data.paciente;
  }

  operar(){
    if(this.control != null && this.control.idControl > 0){
      //MODIFICAR
      //BUENA PRACTICA CON OBSERVABLE Y PROG. REACTIVA
      this.controlService.modificar(this.control).pipe(switchMap( () =>{
        return this.controlService.listar();
      })).subscribe(data => {
        this.controlService.controlCambio.next(data);
        this.controlService.mensajeCambio.next("SE MODIFICO");
        console.log(data);
      });
    } else{
      //REGISTRAR
      //PRACTICA COMUN
      this.controlService.registrar(this.control).subscribe( () =>{
        this.controlService.listar().subscribe(data => {
          this.controlService.controlCambio.next(data);
          this.controlService.mensajeCambio.next("SE REGISTRO");
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar(){
    this.dialogRef.close();
  }

}
