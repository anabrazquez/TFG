import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as CanvasJS from './../../../../src/assets/canvas/canvasjs.min';

@Component({
  selector: 'app-graficoOrigen',
  templateUrl: './graficoOrigen.component.html',
  styleUrls: ['./graficoOrigen.component.scss']
})
export class GraficoOrigenComponent implements OnInit {

  constructor() { }

	ngOnInit() {
    let dataPoints = [];
    let dpsLength = 0;
    let chart = new CanvasJS.Chart("chartContainerOrigen",{
      exportEnabled: true,
      title:{
        text:""
      },
      data: [{
        type: "spline",
        dataPoints : dataPoints,
      }]
    });
    
    $.getJSON("/../../../../data/datosOrigen.json", function(data) {  
      $.each(data, function(key, value){
        dataPoints.push({x: value[0], y: parseInt(value[1])});
      });
      dpsLength = dataPoints.length;
      chart.render();
      updateChart();
    });
    function updateChart() {	
  // $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dpsLength + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json&callback=?", function(data) {
  $.getJSON('/../../../../data/datosOrigen.json', function(data) {  
    $.each(data, function(key, value) {
        dataPoints.push({
        x: parseInt(value[0]),
        y: parseInt(value[1])
        });
        dpsLength++;
      });
      
      if (dataPoints.length >  20 ) {
            dataPoints.shift();				
          }
      chart.render();
      setTimeout(function(){updateChart()}, 1000);
    });
      }
  }

}
