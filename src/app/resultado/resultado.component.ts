import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  saveDemo() {
    const file = new Blob(['hello world'], { type: 'text/plain;charset=utf-8' });
    saveAs(file, 'helloworld.txt');
  }

}
