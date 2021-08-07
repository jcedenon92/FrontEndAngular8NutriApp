import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Vacuna } from 'src/app/_model/vacuna';
import { VacunaService } from 'src/app/_service/vacuna.service';
import { switchMap } from 'rxjs/operators';
import { VacunaDialogoComponent } from './vacuna-dialogo/vacuna-dialogo.component';

@Component({
  selector: 'app-vacuna',
  templateUrl: './vacuna.component.html',
  styleUrls: ['./vacuna.component.css']
})
export class VacunaComponent implements OnInit {

  dataSource: MatTableDataSource<Vacuna>;
  displayedColumns = ['idVacuna', 'nombre', 'acciones'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private vacunaService: VacunaService,
    private snack : MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.vacunaService.vacunaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.vacunaService.mensajeCambio.subscribe(data => {
      this.snack.open(data,'AVISO', {
        duration: 2000
      });
    });

    this.vacunaService.listar().subscribe(data =>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(vacuna : Vacuna){
    this.vacunaService.eliminar(vacuna.idVacuna).pipe(switchMap( () => {
      return this.vacunaService.listar();
    })).subscribe(data => {
      this.vacunaService.vacunaCambio.next(data);
      this.vacunaService.mensajeCambio.next('SE ELIMINO');
    });
  }

  abrirDialogo(vacuna? : Vacuna){
    let vac = vacuna != null ? vacuna : new Vacuna();
    this.dialog.open(VacunaDialogoComponent, {
      width: '300px',
      data: vac
    })
  }

}
