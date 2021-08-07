import { switchMap } from 'rxjs/operators';
import { TurnocomidaDialogoComponent } from './turnocomida-dialogo/turnocomida-dialogo.component';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { TurnocomidaService } from './../../_service/turnocomida.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TurnoComida } from 'src/app/_model/turnocomida';

@Component({
  selector: 'app-turnocomida',
  templateUrl: './turnocomida.component.html',
  styleUrls: ['./turnocomida.component.css']
})
export class TurnocomidaComponent implements OnInit {
 
  dataSource: MatTableDataSource<TurnoComida>;
  displayedColumns = ['idTurnoComida', 'nombre', 'acciones'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private turnocomidaService: TurnocomidaService,
    private snack: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.turnocomidaService.turnocomidaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.turnocomidaService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.turnocomidaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(turnocomida: TurnoComida) {
    this.turnocomidaService.eliminar(turnocomida.idTurnoComida).pipe(switchMap(() => {
      return this.turnocomidaService.listar();
    })).subscribe(data => {
      this.turnocomidaService.turnocomidaCambio.next(data);
      this.turnocomidaService.mensajeCambio.next('SE ELIMINO');
    });
  }

  abrirDialogo(turnocomida?: TurnoComida) {
    let tur = turnocomida != null ? turnocomida : new TurnoComida();
    this.dialog.open(TurnocomidaDialogoComponent, {
      width: '300px',
      data: tur
    })
  }

}
