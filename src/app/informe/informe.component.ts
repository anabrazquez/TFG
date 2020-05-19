import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './../../../src/assets/canvas/canvasjs.min';
@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss']
})
export class InformeComponent implements OnInit {

  constructor() { }
//var CanvasJS = require('./canvasjs.min');
 
	ngOnInit() {
	let dataPoints = [];
	let y = 0;		
	for ( var i = 0; i < 10000; i++ ) {		  
		y += Math.round(5 + Math.random() * (-5 - 5));	
		dataPoints.push({ y: y});
	}
	let chart = new CanvasJS.Chart("chartContainer", {
		zoomEnabled: true,
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Performance Demo - 10000 DataPoints"
		},
		subtitles:[{
			text: "Try Zooming and Panning"
		}],
		data: [
		{
			type: "line",                
			dataPoints: dataPoints
		}]
	});
		
	chart.render();
    }
}
