import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ControlService } from 'src/app/_service/control.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  tipo: string;
  chart: any;

  constructor(
    private controlService: ControlService
  ) { }

  ngOnInit() {
    this.tipo = 'line';
    this.dibujar();
  }

  cambiar(tipo: string) {
    this.tipo = tipo;
    if (this.chart != null) {
      this.chart.destroy();
    }
    this.dibujar();
  }

  dibujar() {
    this.controlService.listarResumen().subscribe(data => {
      let pesos = data.map(x => x.peso);
      let fechas = data.map(x => x.fecha);

      console.log(pesos);
      console.log(fechas);

      this.chart = new Chart('canvas', {
        type: this.tipo,
        data: {
          labels: fechas,
          datasets: [
            {
              label: 'Pesos',
              data: pesos,
              borderColor: "#cc0000",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }
}
