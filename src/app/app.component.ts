import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'tfg-app';
  muestraInicio1: Boolean;
  muestraInicio2: Boolean;

  ngOnInit(){
    this.mostrarInicio1()
} 

mostrarInicio1(){
  console.log('1')
    this.muestraInicio1 = true;
    this.muestraInicio2 = false;
  }

  mostrarInicio2(){
    console.log('2')
    this.muestraInicio2 = true;
    this.muestraInicio1 = false;
  }
}



