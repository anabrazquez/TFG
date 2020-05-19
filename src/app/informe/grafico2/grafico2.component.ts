import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './../../../../src/assets/canvas/canvasjs.min';

@Component({
  selector: 'app-grafico2',
  templateUrl: './grafico2.component.html',
  styleUrls: ['./grafico2.component.scss']
})
export class Grafico2Component implements OnInit {

  constructor() { }

	ngOnInit() {
		let chart = new CanvasJS.Chart("chartContainer2", {
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Valores máximos en distintas pruebas"
		},
		data: [{
			type: "column",
			dataPoints: [
				{ y: 71, label: "Prueba1" },
				{ y: 55, label: "Prueba2" },
				{ y: 50, label: "Prueba3" },
				{ y: 65, label: "Prueba4" },
				{ y: 95, label: "Prueba5" },
				{ y: 68, label: "Prueba6" },
				{ y: 28, label: "Prueba7" },
				{ y: 34, label: "Prueba8" },
				{ y: 14, label: "Prueba9" }
			]
		}]
	});
		
	chart.render();
    }
}
