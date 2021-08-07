import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { Prediccion } from 'src/app/_model/prediccion';
import { PrediccionService } from 'src/app/_service/prediccion.service';

@Component({
  selector: 'app-prediccion',
  templateUrl: './prediccion.component.html',
  styleUrls: ['./prediccion.component.css']
})
export class PrediccionComponent implements OnInit {

  prediccion: Prediccion;

  dataSource: MatTableDataSource<Prediccion>;
  displayedColumns = ['idPrediccion', 'parametro', 'mes', 'acciones'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private prediccionService: PrediccionService,
    private snack : MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.prediccion = new Prediccion();
    this.prediccion.parametro = "cabeza";
    this.prediccion.mes = 12;

    this.prediccionService.listar().subscribe(data =>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}
