import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { Dosis } from 'src/app/_model/dosis';
import { DosisService } from 'src/app/_service/dosis.service';
import { DosisDialogoComponent } from './dosis-dialogo/dosis-dialogo.component';

@Component({
  selector: 'app-dosis',
  templateUrl: './dosis.component.html',
  styleUrls: ['./dosis.component.css']
})
export class DosisComponent implements OnInit {

  dataSource: MatTableDataSource<Dosis>;
  displayedColumns = ['idDosis', 'fechaMes', 'vacuna', 'acciones'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private dosisService: DosisService,
    private snack : MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dosisService.dosisCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.dosisService.mensajeCambio.subscribe(data => {
      this.snack.open(data,'AVISO', {
        duration: 2000
      });
    });

    this.dosisService.listar().subscribe(data =>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(dosis : Dosis){
    this.dosisService.eliminar(dosis.idDosis).pipe(switchMap( () => {
      return this.dosisService.listar();
    })).subscribe(data => {
      this.dosisService.dosisCambio.next(data);
      this.dosisService.mensajeCambio.next('SE ELIMINO');
    });
  }

  abrirDialogo(dosis? : Dosis){
    let dos = dosis != null ? dosis : new Dosis();
    this.dialog.open(DosisDialogoComponent, {
      width: '300px',
      data: dos
    })
  }

}
