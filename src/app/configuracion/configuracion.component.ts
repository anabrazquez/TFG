import { Component, OnInit, Input, ɵConsole, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { numberValido } from './number-validator.directive';
import { InicioService } from '../inicio/inicio.service';
import { GlobalService } from '../inicio/globalService.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
  providers: [InicioService]
})

export class ConfiguracionComponent implements  OnInit {

    public configFormulario: FormGroup;
    public enviado: Boolean = false;
    public closeAlert: Boolean = true;
    public closeAlertError: Boolean = true;
    public errorEnvio: String;
    formSuscription;
    errorLlamada : boolean = false;
    public canales: any[] = [{
        'id': 1,
        'name': 'Channel 1'
    },
    {
        'id': 2,
        'name': 'Channel 2'
    },
    {
        'id': 3,
        'name': 'Channel 3'
    },
    {
        'id': 4,
        'name': 'Channel 4'
    }];

    public valoresConfiguracion = {
        "canal" : "",
        "trigger": false,
        "voltaje" : "",
        "tiempo" : 0,
        "fMuestreo": "",
        "puntos": 0
    }

    public respuesta = {
        "ejex" : [],
        "ejey" : [],
        "salto": ""
    }
    recibidoOk: Boolean ;
    triggerAsignado: Boolean;
    disableTime: Boolean;
    tiempoSeteado: number = 0;
        subscripcionGlobal: Subscription;
        ejex : any[];
        ejey : any[];
        nombreGrafica : string;
    constructor(private formBuilder: FormBuilder, public inicioService: InicioService, private globalService: GlobalService) {
       
    }
  
    ngOnInit(){
        this.llamadaOrigenSignal();
        this.errorEnvio = '';
        this.buildFormularioConfig();
        // this.recibidoOk = false;
        this.disableTime = false;
    }

    ngOnDestroy () {
        
        const compartirRes = null;
        this.globalService.emitAuthentication(compartirRes);
        if (this.subscripcionGlobal != undefined){
            this.subscripcionGlobal.unsubscribe();
        }
        
    }

    limpiar() {
        this.configFormulario.reset();
        this.disableTime = false;
    }

    refresh(){
        console.log('Refrescar');
        let tipo;
            this.subscripcionGlobal = this.globalService.signalEmitter$.subscribe((res) => {
                if (res != null) {
                    this.ejex = res.ejes.ejex;
                    this.ejey = res.ejes.ejey;
                    this.nombreGrafica = res.nombreGrafica;
                }
            });
              if (this.nombreGrafica == 'ORIGINAL'){
                this.respuesta = this.getOrigenSignal();
                tipo = 'ORIGINAL';
            } else if(this.nombreGrafica == 'MODIFICADA'){
                this.respuesta = this.setSignalConfig(this.valoresConfiguracion);
                tipo = 'MODIFICADA';
            } else if(this.nombreGrafica == 'FFT'){
                this.respuesta = this.getFFT(this.valoresConfiguracion);
                tipo = 'FFT';
            }
            else if(this.nombreGrafica == 'PSD'){
                this.respuesta = this.getFFTPotencia(this.valoresConfiguracion);
                tipo = 'PSD';
            }

            const compartirRes = {
                'ejes': this.respuesta,
                'nombreGrafica' : tipo,
                'error' : this.errorLlamada,
                'valoresConfiguracion' : this.valoresConfiguracion
                }
                console.log('compartirRes', compartirRes);
                this.globalService.emitAuthentication(compartirRes);
    }

    getOrigenSignal(): any {
        this.inicioService.getOrigenSignal().then((response) => {
            this.errorLlamada = false;
            this.respuesta = response;
            console.log('RESPUESTA ORIGEN: ', this.respuesta)
            const compartirRes = {
                'ejes': this.respuesta,
                'nombreGrafica' : 'ORIGINAL',
                'error' : this.errorLlamada,
                'valoresConfiguracion' : this.valoresConfiguracion
                }
                this.globalService.emitAuthentication(compartirRes);
            return this.respuesta;
        },
        (error) => {
          this.errorLlamada = true;
          console.log('Ha fallado la obtención de la señal origen: ', error)
          return null;
        });

    };

    llamadaOrigenSignal(): any {
        // this.inicioService.getOrigenSignal().then((response) => {
            this.errorLlamada = false;
            // this.respuesta = response;
            console.log('RESPUESTA ORIGEN: ', this.respuesta)
            const compartirRes = {
                'ejes': this.respuesta,
                'nombreGrafica' : 'ORIGINAL',
                'error' : this.errorLlamada,
                'valoresConfiguracion' : this.valoresConfiguracion
                }
                this.globalService.emitAuthentication(compartirRes);
            return this.respuesta;
        // },
        // (error) => {
        //   this.errorLlamada = true;
        //   console.log('Ha fallado la obtención de la señal origen: ', error)
        //   return null;
        // });

    };
    buildFormularioConfig() {
        this.configFormulario = this.formBuilder.group({
            canal: [1 , Validators.required],
            trigger: [true],
            tiempo: [this.tiempoSeteado,  Validators.required && numberValido() && Validators.min(0) && Validators.max(30)],
            voltaje: [0.00 ,numberValido() && Validators.min(0) && Validators.max(5)],
            muestreo: [0, Validators.required && numberValido() && Validators.min(0) && Validators.max(1)],
            n: [0, Validators.min(1) && Validators.max(256)]
        });
    }

    get f() { return this.configFormulario.controls; }

            // this.envioFormulario.reset({ direccionemail: null, asunto: this.tipoSugerencia, mensaje: null });

    formularioValido() {
        return this.configFormulario.valid;
    }
    // signalRecibidaOK(mostrarFFTButtom){
    //     this.recibidoOk =  mostrarFFTButtom;
    // }
    getFFTPotencia(valoresConfiguracion): any {
        this.inicioService.getFFTPotencia(valoresConfiguracion).then((response) => {
            this.errorLlamada = false;
            this.respuesta = {
              "ejex" : response.ejex,
              "ejey" : response.ejey,
              "salto" : response.salto
            }
            return this.respuesta;
          },
          (error) => {
              this.errorLlamada = true;
              console.log('Ha fallado psd: ', error)
              return null;
          });

          
        //   setTimeout(()=>{ 
        //     this.generarFFT();
        // }, 4000);
          const compartirRes = {
            'ejes': this.respuesta,
            'nombreGrafica' : 'PSD',
            'error' : this.errorLlamada,
            'valoresConfiguracion' : this.valoresConfiguracion
            }
            this.globalService.emitAuthentication(compartirRes);
            console.log('Respuesta psd: ', compartirRes)
      };

      getFFT(valoresConfiguracion): any {
        this.inicioService.getFFT(valoresConfiguracion).then((response) => {
            this.errorLlamada = false;
            this.respuesta = {
              "ejex" : response.ejex,
              "ejey" : response.ejey,
              "salto" : response.salto
            }
            return this.respuesta;
          },
          (error) => {
              this.errorLlamada = true;
              console.log('Ha fallado fft: ', error)
              return null;
          });

          
        //   setTimeout(()=>{ 
        //     this.generarFFT();
        // }, 4000);
          const compartirRes = {
            'ejes': this.respuesta,
            'nombreGrafica' : 'FFT',
            'error' : this.errorLlamada,
            'valoresConfiguracion' : this.valoresConfiguracion
            }
            this.globalService.emitAuthentication(compartirRes);
            console.log('Respuesta fft: ', compartirRes)
      };

      llamarFFT(){
        const compartirRes = {
            'ejes': this.respuesta,
            'nombreGrafica' : 'FFT',
            'error' : this.errorLlamada,
            'valoresConfiguracion' : this.valoresConfiguracion
            }
        this.globalService.emitAuthentication(compartirRes);
      }

      llamarPSD(){
        const compartirRes = {
            'ejes': this.respuesta,
            'nombreGrafica' : 'PSD',
            'error' : this.errorLlamada,
            'valoresConfiguracion' : this.valoresConfiguracion
            }
        this.globalService.emitAuthentication(compartirRes);
      }
      llamarSignalConf(){}
    enviarFormulario() {
        if ( this.configFormulario.value.trigger == true){
            this.triggerAsignado = true;
        } else {
            this.triggerAsignado = false;
        }
        this.tiempoSeteado = this.configFormulario.value.tiempo;
        if(this.tiempoSeteado != 0) {
            this.disableTime = true;
            this.configFormulario.controls['tiempo'].disable();
           } else {
            this.disableTime = false;
            }
        // this.recibidoOk = false;
        this.valoresConfiguracion= {
            "canal" :  this.configFormulario.value.canal,
            "trigger":  this.configFormulario.value.trigger,
            "voltaje" : this.configFormulario.value.voltaje,
            "tiempo" : this.configFormulario.value.tiempo,
            "fMuestreo": this.configFormulario.value.muestreo,
            "puntos": this.configFormulario.value.n
        }
        console.log('valoresConfiguracion: ', this.valoresConfiguracion)
        this.setSignalConfig(this.valoresConfiguracion);

    }

    setSignalConfig(valoresConfiguracion): any {

        this.inicioService.signalConfiguration(valoresConfiguracion).then((response) => {
        this.errorLlamada = false;
          this.respuesta = {
            "ejex" : response.ejex,
            "ejey" : response.ejey,
            "salto" : response.salto
          }
        //   this.signalRecibidaOK(true);
        //   if (this.respuesta.ejex == [] || this.respuesta.ejey == []){
        //     this.signalRecibidaOK(false);
        //   }
          return this.respuesta;
        },
        (error) => {
            this.errorLlamada = true;
            // this.signalRecibidaOK(false);
            console.log('Ha fallado configuracion: ', error)
            return null;
        });

       
        const compartirRes = {
            'ejes': this.respuesta,
            'nombreGrafica' : 'MODIFICADA',
            'error' : this.errorLlamada,
            'valoresConfiguracion' : this.valoresConfiguracion
            }
            this.globalService.emitAuthentication(compartirRes);
    };
}

