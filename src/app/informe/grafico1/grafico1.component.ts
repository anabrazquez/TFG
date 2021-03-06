import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as CanvasJS from './../../../../src/assets/canvas/canvasjs.min';

@Component({
  selector: 'app-grafico1',
  templateUrl: './grafico1.component.html',
  styleUrls: ['./grafico1.component.scss']
})
export class Grafico1Component implements OnInit {

  constructor() { }

	ngOnInit() {
    let dataPoints = [];
    let dpsLength = 0;
    let chart = new CanvasJS.Chart("chartContainer",{
      exportEnabled: true,
      title:{
        text:"Live Chart with Data-Points from External JSON"
      },
      data: [{
        type: "spline",
        dataPoints : dataPoints,
      }]
    });
    
    $.getJSON("/../../../../data/datapoints.json", function(data) {  
      $.each(data, function(key, value){
        dataPoints.push({x: value[0], y: parseInt(value[1])});
      });
      dpsLength = dataPoints.length;
      chart.render();
      updateChart();
    });
    function updateChart() {	
    // $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dpsLength + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json&callback=?", function(data) {
  $.getJSON('/../../../../data/datapoints.json', function(data) {  
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
