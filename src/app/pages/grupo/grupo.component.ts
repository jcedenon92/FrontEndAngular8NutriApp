import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/app/_service/grupo.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  constructor(private grupoService: GrupoService) { }

  ngOnInit() {
    this.grupoService.listar().subscribe(data => console.log(data));
  }

}
