import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { Dias } from 'src/app/_model/dias';
import { DiasService } from 'src/app/_service/dias.service';
import { DiasDialogoComponent } from './dias-dialogo/dias-dialogo.component';

@Component({
  selector: 'app-dias',
  templateUrl: './dias.component.html',
  styleUrls: ['./dias.component.css']
})
export class DiasComponent implements OnInit {

  dataSource: MatTableDataSource<Dias>;
  displayedColumns = ['idDias', 'nombre', 'acciones'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private diasService: DiasService,
    private snack : MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.diasService.diasCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.diasService.mensajeCambio.subscribe(data => {
      this.snack.open(data,'AVISO', {
        duration: 2000
      });

    });

    this.diasService.listar().subscribe(data =>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(dias : Dias){
    this.diasService.eliminar(dias.idDias).pipe(switchMap( () => {
      return this.diasService.listar();
    })).subscribe(data => {
      this.diasService.diasCambio.next(data);
      this.diasService.mensajeCambio.next('SE ELIMINO');
    });
  }

  abrirDialogo(dias? : Dias){
    let dia = dias != null ? dias : new Dias();
    this.dialog.open(DiasDialogoComponent, {
      width: '300px',
      data: dia
    })
  }

}
