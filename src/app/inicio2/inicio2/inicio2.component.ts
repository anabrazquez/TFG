import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InicioService } from 'src/app/inicio/inicio.service';

@Component({
  selector: 'app-inicio2',
  templateUrl: './inicio2.component.html',
  styleUrls: ['./inicio2.component.scss'],
  providers: [InicioService]
})
export class Inicio2Component implements OnInit {

  constructor(private formBuilder: FormBuilder, public inicioService: InicioService ) { }
  public paramsFormulario: FormGroup;
  public parametros = {
    "amplitud" : false,
    "frecuencia" : false,
    "periodo" : false,
    "tensionMaxima" : false,
    "tensionMinima" : false
  }
public respuesta = {
  "amplitud" : "",
  "frecuencia" : "",
  "periodo" : "",
  "tensionMaxima" : "",
  "tensionMinima" : ""
}
public amp = "";
public frec = "";
public per = "";
public vMax = "";
public vMin = "";
errorLlamada: Boolean;
cargandoLlamada: Boolean;
  ngOnInit() {
    this.buildFormularioParams();
  }

  
  buildFormularioParams() {
    this.paramsFormulario = this.formBuilder.group({
      amplitud: [false],
      frecuencia: [false],
      periodo: [false],
      tensionMaxima: [false],
      tensionMinima: [false]
    });
}

enviarFormulario() {
  this.parametros= {
      "amplitud" :  this.paramsFormulario.value.amplitud,
      "frecuencia":  this.paramsFormulario.value.frecuencia,
      "periodo":  this.paramsFormulario.value.periodo,
      "tensionMaxima" : this.paramsFormulario.value.tensionMaxima,
      "tensionMinima" : this.paramsFormulario.value.tensionMinima
  }
  this.getSignalParams(this.parametros);

}

getSignalParams(parametros): any {

  this.inicioService.getSignalParams(parametros).then((response) => {
      this.cargandoLlamada = true;
      this.errorLlamada = false;
      if (response != null && response != undefined  && response != ""){
        this.respuesta = {
          "amplitud" : response.amplitud,
          "frecuencia" : response.frecuencia,
          "periodo": response.periodo,
          "tensionMaxima" : response.tensionMaxima,
          "tensionMinima" : response.tensionMinima
        }
        this.amp = this.respuesta.amplitud;
        this.frec = this.respuesta.frecuencia;
        this.per = this.respuesta.periodo;
        this.vMax = this.respuesta.tensionMaxima;
        this.vMin = this.respuesta.tensionMinima;
      } else {
        this.amp = "";
        this.frec = "";
        this.per = "";
        this.vMax ="";
        this.vMin = "";
      }
      console.log('respuesta calculos', response)
      this.cargandoLlamada = false;
      },
      (error) => {
          this.cargandoLlamada = false;
          this.errorLlamada = true;
          console.log('Ha fallado el cálculo de parámetros: ', error)
          return null;
      });

};


formularioValido() {
  return this.paramsFormulario.valid;
}
}

