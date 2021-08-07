import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  pacientes : Paciente[];

  constructor(
    private pacienteService: PacienteService
  ) { }

  ngOnInit() {
    this.listarPacientes();
  }

  listarPacientes(){
    this.pacienteService.listar().subscribe(data =>{
      console.log(data);
      this.pacientes = data;
    })
  }

}
