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
    "periodo" : false
}
public respuesta = {
  "amplitud" : "",
  "frecuencia" : "",
  "periodo" : ""
}
public amp = "";
public frec = "";
public per = "";
errorLlamada: Boolean;
cargandoLlamada: Boolean;
  ngOnInit() {
    this.buildFormularioParams();
  }

  
  buildFormularioParams() {
    this.paramsFormulario = this.formBuilder.group({
      amplitud: [false],
      frecuencia: [false],
      periodo: [false]
    });
}

enviarFormulario() {
  this.parametros= {
      "amplitud" :  this.paramsFormulario.value.amplitud,
      "frecuencia":  this.paramsFormulario.value.frecuencia,
      "periodo":  this.paramsFormulario.value.periodo
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
          "periodo": response.periodo
        }
        this.amp = this.respuesta.amplitud;
        this.frec = this.respuesta.frecuencia;
        this.per = this.respuesta.periodo;
      } else {
        this.amp = "";
        this.frec = "";
        this.per = "";
      }
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

