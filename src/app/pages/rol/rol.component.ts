import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Rol } from 'src/app/_model/rol';
import { RolService } from 'src/app/_service/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  dataSource: MatTableDataSource<Rol>;
  displayedColumns = ['idRol', 'nombre', 'descripcion', 'acciones'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private rolService: RolService,
    private snack : MatSnackBar
    ) { }

  ngOnInit() {
    //se ejecutará "n" veces se use el metodo next
    this.rolService.rolCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.rolService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });

    //Se ejecuta al cargar la pagina por unica vez
    this.rolService.listar().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idRol: number){
    this.rolService.eliminar(idRol).subscribe(() => {
      this.rolService.listar().subscribe(data => {
        this.rolService.rolCambio.next(data);
        this.rolService.mensajeCambio.next('SE ELIMINO');
      });
    });
  }
}
