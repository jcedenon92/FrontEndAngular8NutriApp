import { Component, OnInit } from '@angular/core';
import { DetalleplanService } from 'src/app/_service/detalleplan.service';

@Component({
  selector: 'app-detalleplan',
  templateUrl: './detalleplan.component.html',
  styleUrls: ['./detalleplan.component.css']
})
export class DetalleplanComponent implements OnInit {

  constructor(
    private detallePlanService: DetalleplanService
  ) { }

  ngOnInit() {
    this.listarDetalles();
  }

  listarDetalles(){
    this.detallePlanService.listar().subscribe( data =>{
      console.log(data);
    })
  }

}
