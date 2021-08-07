import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { Control } from 'src/app/_model/control';
import { Prediccion } from 'src/app/_model/prediccion';
import { ControlService } from 'src/app/_service/control.service';
import { PacienteService } from 'src/app/_service/paciente.service';
import { PrediccionService } from 'src/app/_service/prediccion.service';
import { ControlDialogoComponent } from './control-dialogo/control-dialogo.component';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  prediccion : Prediccion;

  dataSource: MatTableDataSource<Control>;
  displayedColumns = [
    'idControl',
    'fechaControl',
    'edadMes',
    'peso',
    'estatura',
    'cabeza',
    'observacion',
    'acciones'
  ];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private controlService: ControlService,
    private prediccionService: PrediccionService,
    private snack : MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.prediccion = new Prediccion();
    this.prediccion.idPrediccion = 1;
    this.prediccion.parametro = "cabeza";
    this.prediccion.mes = 12;

    this.controlService.controlCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.controlService.mensajeCambio.subscribe(data => {
      this.snack.open(data,'AVISO', {
        duration: 2000
      });
    });

    this.controlService.listar().subscribe(data =>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.prediccionService.predecir(this.prediccion).subscribe(data => {

    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(control : Control){
    this.controlService.eliminar(control.idControl).pipe(switchMap( () => {
      return this.controlService.listar();
    })).subscribe(data => {
      this.controlService.controlCambio.next(data);
      this.controlService.mensajeCambio.next('SE ELIMINO');
    });
  }

  abrirDialogo(control? : Control){
    let con = control != null ? control : new Control();
    this.dialog.open(ControlDialogoComponent, {
      width: '300px',
      data: con
    })
  }

}
