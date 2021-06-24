import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/_service/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  constructor(private rolService: RolService) { }

  ngOnInit() {
    this.rolService.listar().subscribe(data => console.log(data));
  }
}
