import { UsuarioService } from './../../_service/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Usuario } from 'src/app/_model/usuario';
import { Rol } from 'src/app/_model/rol';
import { RolService } from 'src/app/_service/rol.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  dataSource: MatTableDataSource<Usuario>;
  dataSource2: MatTableDataSource<Rol>;
  displayedColumns = [
    'idUsuario',
    'nombres',
    'fechaNacimiento',
    'username',
    'password',
    'email',
    'estado',
    'Rol',
    'acciones'
  ];

  usuarios : Usuario[];
  roles : Rol[];

  @ViewChild(MatSort, {static : true }) sort: MatSort;
  @ViewChild(MatPaginator, {static : true }) paginator: MatPaginator;

  idUsuarioSeleccionado: number;

  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService
  ) { }

  ngOnInit() {
    this.listarRoles();
    this.listarUsuarios();
  }

  listarRoles(){
    this.rolService.listar().subscribe(data =>{
      console.log(data);
      this.dataSource2 = new MatTableDataSource(data);
      this.dataSource2.sort = this.sort;
      this.dataSource2.paginator = this.paginator;
    })
  }

  listarUsuarios(){
    this.usuarioService.listar().subscribe(data =>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

}
