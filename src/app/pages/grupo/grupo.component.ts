import { switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Grupo } from 'src/app/_model/grupo';
import { GrupoService } from 'src/app/_service/grupo.service';
import { GrupoDialogoComponent } from './grupo-dialogo/grupo-dialogo.component';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  dataSource: MatTableDataSource<Grupo>;
  displayedColumns = ['idGrupo', 'nombre', 'acciones'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private grupoService: GrupoService,
    private snack : MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.grupoService.grupoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.grupoService.mensajeCambio.subscribe(data => {
      this.snack.open(data,'AVISO', {
        duration: 2000
      });

    });

    this.grupoService.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(grupo : Grupo){
    this.grupoService.eliminar(grupo.idGrupo).pipe(switchMap( () => {
      return this.grupoService.listar();
    })).subscribe(data => {
      this.grupoService.grupoCambio.next(data);
      this.grupoService.mensajeCambio.next('SE ELIMINO');
    });
  }

  abrirDialogo(grupo? : Grupo){
    let gru = grupo != null ? grupo : new Grupo();
    this.dialog.open(GrupoDialogoComponent, {
      width: '300px',
      data: gru
    })
  }

}
