import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/_service/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  constructor(
    private planService: PlanService
  ) { }

  ngOnInit() {
    this.listarPlanes();
  }

  listarPlanes(){
    this.planService.listar().subscribe(data =>{
      console.log(data);
    })
  }
}
