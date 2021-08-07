import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material'
import { switchMap } from 'rxjs/operators'
import { Alimento } from 'src/app/_model/alimento'
import { AlimentoService } from 'src/app/_service/alimento.service'
import { GrupoService } from 'src/app/_service/grupo.service'
import { AlimentoDialogoComponent } from './alimento-dialogo/alimento-dialogo.component'

@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.component.html',
  styleUrls: ['./alimento.component.css']
})
export class AlimentoComponent implements OnInit {

  dataSource: MatTableDataSource<Alimento>;
  displayedColumns = [
    'idAlimento',
    'nombre',
    'cantidad',
    'energyKcal',
    /*'energyKj',
    'water',
    'prot',
    'fat',
    'choCdf',
    'choAvl',
    'fib',
    'fibTg',
    'ash',
    'ca',
    'p',
    'zn',
    */'fe',
    /*'beta',
    'retinol',
    'vitA',
    'thia',
    'ribf',
    'nia',*/
    'vitC',
    'grupo',
    'acciones'
  ];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private alimentoService: AlimentoService,
    private grupoService: GrupoService,
    private snack:  MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    //se ejecutará "n" veces se use el metodo next
    this.alimentoService.alimentoCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.alimentoService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });

    //Se ejecuta al cargar la pagina por unica vez
    this.alimentoService.listar().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(alimento : Alimento){
    this.alimentoService.eliminar(alimento.idAlimento).pipe(switchMap( () => {
      return this.alimentoService.listar();
    })).subscribe(data => {
      this.alimentoService.alimentoCambio.next(data);
      this.alimentoService.mensajeCambio.next('SE ELIMINO');
    });
  }

  abrirDialogo(alimento? : Alimento){
    let ali = alimento != null ? alimento : new Alimento();
    this.dialog.open(AlimentoDialogoComponent, {
      width: '300px',
      data: ali
    })
  }
}
