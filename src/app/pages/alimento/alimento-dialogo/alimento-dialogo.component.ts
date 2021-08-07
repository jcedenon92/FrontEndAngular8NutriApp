import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { Alimento } from 'src/app/_model/alimento';
import { AlimentoService } from 'src/app/_service/alimento.service';

@Component({
  selector: 'app-alimento-dialogo',
  templateUrl: './alimento-dialogo.component.html',
  styleUrls: ['./alimento-dialogo.component.css']
})
export class AlimentoDialogoComponent implements OnInit {

  alimento : Alimento;

  constructor(
    private dialogRef: MatDialogRef<AlimentoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Alimento,
    private alimentoService: AlimentoService
  ) { }

  ngOnInit() {
    this.alimento = new Alimento();
    this.alimento.idAlimento = this.data.idAlimento;
    this.alimento.nombre = this.data.nombre;
    this.alimento.cantidad = this.data.cantidad;
    this.alimento.energyKcal = this.data.energyKcal;
    this.alimento.energyKj = this.data.energyKj;
    this.alimento.water = this.data.water;
    this.alimento.prot = this.data.prot;
    this.alimento.fat = this.data.fat;
    this.alimento.choCdf = this.data.choCdf;
    this.alimento.choAvl = this.data.choAvl;
    this.alimento.fib = this.data.fib;
    this.alimento.fibTg = this.data.fibTg;
    this.alimento.ash = this.data.ash;
    this.alimento.ca = this.data.ca;
    this.alimento.p = this.data.p;
    this.alimento.zn = this.data.zn;
    this.alimento.fe = this.data.fe;
    this.alimento.retinol = this.data.retinol;
    this.alimento.vitA = this.data.vitA;
    this.alimento.thia = this.data.thia;
    this.alimento.ribf = this.data.ribf;
    this.alimento.nia = this.data.nia;
    this.alimento.vitC = this.data.vitC;
    this.alimento.grupo = this.data.grupo;
  }

  operar(){
    if(this.alimento != null && this.alimento.idAlimento > 0){
      //MODIFICAR
      //BUENA PRACTICA CON OBSERVABLE Y PROG. REACTIVA
      this.alimentoService.modificar(this.alimento).pipe(switchMap( () =>{
        return this.alimentoService.listar();
      })).subscribe(data => {
        this.alimentoService.alimentoCambio.next(data);
        this.alimentoService.mensajeCambio.next("SE MODIFICO");
      });
    } else{
      //REGISTRAR
      //PRACTICA COMUN
      this.alimentoService.registrar(this.alimento).subscribe( () =>{
        this.alimentoService.listar().subscribe(data => {
          this.alimentoService.alimentoCambio.next(data);
          this.alimentoService.mensajeCambio.next("SE REGISTRO");
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar(){
    this.dialogRef.close();
  }

}
