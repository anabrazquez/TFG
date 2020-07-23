import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { GlobalService } from '../inicio/globalService.service';
import { InicioService } from '../inicio/inicio.service';
@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss'],
  providers: [InicioService]
})
export class InformeComponent implements OnInit {
  subscripcionGlobal: Subscription;
  ejes: any;
  tipo: string;
  error: boolean = false;
  errorOriginal: boolean = false;
  cargandoOriginal: boolean = false;
  errorConfigurada: boolean = false;
  cargandoConfigurada: boolean = false;
  cargada1: boolean;
  cargada2: boolean;
  cargada3: boolean;
  cargada4: boolean;
  myChart: any;
  public xyFinal = [];
  public valoresConfiguracion = {
    "canal": "",
    "trigger": false,
    "voltaje": "",
    "tiempo": 0,
    "fMuestreo": "",
    "puntos": 0
  }
  constructor(public globalService: GlobalService, public inicioService: InicioService) { }

  ngOnDestroy() {
    if (this.subscripcionGlobal != undefined) {
      this.subscripcionGlobal.unsubscribe();
    }
  }

  ngOnInit() {
    this.cargada1 = false;
    this.cargada2 = false;
    this.cargada3 = false;
    this.cargada4 = false;
    this.sus();
  }

  sus() {
    this.cargandoOriginal = true;
    this.ejes = null;
    this.subscripcionGlobal = this.globalService.signalEmitter$.subscribe((res) => {
      if (res != null) {
        this.ejes = res.ejes;
        this.tipo = res.nombreGrafica;
        this.error = res.error;
        console.log('SALTO: ', this.ejes.salto)
        this.valoresConfiguracion = res.valoresConfiguracion;
        console.log("*****tipo: ", this.tipo)
        if (this.ejes != null && this.ejes != "" && this.tipo == 'ORIGINAL') {
          this.cargandoOriginal = true;
          if (!this.error) {
            this.generarOriginal();
            this.cargada1 = true;
          } else {
            this.errorOriginal = true;
          }
          this.cargandoOriginal = false;
        } else if (this.ejes != null && this.ejes != "" && this.tipo == 'MODIFICADA' || this.tipo == 'FFT' || this.tipo == 'PSD') {
          this.cargandoOriginal = false;
          this.cargandoConfigurada = true;
          if (!this.error) {
            if (this.tipo == 'MODIFICADA') {
              this.generarSignalConfig(this.valoresConfiguracion);
              this.cargada2 = true;
            }
            if (this.tipo == 'FFT') {
              this.generarFFT(this.valoresConfiguracion);
              this.cargada3 = true;
            }
            if (this.tipo == 'PSD') {
              this.generarPSD(this.valoresConfiguracion);
              this.cargada4 = true;
            }
          } else {
            this.errorConfigurada = true;
          }
          this.cargandoConfigurada = false;
        }
      }
    });

  }

  getOrigenSignal(): void {
    console.log("********************ORIGINAL")
    this.cargandoOriginal = true;
    if (this.ejes != null && this.ejes != "" && this.ejes.ejex != [] && this.ejes.ejey != []) {
      this.errorOriginal = false;
      let i = 0;
      this.ejes.ejex.forEach(xValue => {
        //Redondeamos a 2 decimales los valores del eje x
        xValue = Math.round((xValue + Number.EPSILON) * 100) / 100;
        let xy = {
          x: 0.00,
          y: 0.00
        };
        xy.x = xValue;
        let yValue = this.ejes.ejey[i];
        //Redondeamos a 2 decimales los valores del eje y
        yValue = Math.round((yValue + Number.EPSILON) * 100) / 100;
        xy.y = yValue;
        this.xyFinal.push(xy);
        i = i + 1;
      });

      this.cargandoOriginal = false;
      this.showOrigen();
    } else {
      this.errorOriginal = true;
    }
  };


  generarOriginal(): any {
    this.inicioService.getOrigenSignal().then((response) => {
      let respuesta;
      console.log('llamada 2: ', response)
      if (response != undefined) {
        respuesta = {
          "ejex": response.ejex,
          "ejey": response.ejey
        }
        this.ejes.ejex = respuesta.ejex;
        this.ejes.ejey = respuesta.ejey;
        this.getOrigenSignal();
      }
      return respuesta;
    },
      (error) => {
        console.log('Ha fallado la señal origen: ', error)
        return null;
      });
  };
  showOrigen() {
    this.cargandoOriginal = false;
    var ctx = document.getElementById('myChartOrigen');
    this.myChart = new Chart('myChartOrigen', {
      type: 'line',
      data: {
        labels: this.ejes.ejey,
        datasets: [
          {
            label: 'Gráfica señal origen',
            borderWidth: 0.01,
            borderColor: 'rgba(255, 99, 132, 1)',
            // xAxisID: 'Tiempo (s)',
            // yAxisID: 'Voltaje (V)',
            data:
              this.xyFinal,
            showLine: true
            // borderColor: [
            //   'rgba(255, 99, 132, 1)',
            //   'rgba(54, 162, 235, 1)',
            //   'rgba(255, 206, 86, 1)',
            //   'rgba(75, 192, 192, 1)',
            //   'rgba(153, 102, 255, 1)',
            //   'rgba(255, 159, 64, 1)'
            // ],

          }]
      },
      options: {
        elements: {
          line: {
            tension: 0
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              stepSize: this.ejes.salto,
              beginAtZero: true,
              userCallback: function (label, index, labels) {
                label = Math.round((label + Number.EPSILON) * 100) / 100
                return label;
              }
            }
          }],
          xAxes: [{
            ticks: {
              stepSize: this.ejes.salto,
              beginAtZero: true,
              userCallback: function (label, index, labels) {
                label = Math.round((label + Number.EPSILON) * 100) / 100
                return label;
              }
            }
          }]
        },
        bezierCurve: false
      }
    });
  }

  getConfiguradaSignal(salto): void {
    this.cargandoConfigurada = true;

    if (this.ejes != null && this.ejes != "" && this.ejes.ejex != [] && this.ejes.ejey != [] && this.tipo == 'MODIFICADA') {
      this.errorConfigurada = false;
      let i = 0;
      this.ejes.ejex.forEach(xValue => {
        //Redondeamos a 2 decimales los valores del eje x
        xValue = Math.round((xValue + Number.EPSILON) * 100) / 100;
        let xy = {
          x: 0.00,
          y: 0.00
        };
        xy.x = xValue;
        let yValue = this.ejes.ejey[i];
        //Redondeamos a 2 decimales los valores del eje y
        yValue = Math.round((yValue + Number.EPSILON) * 100) / 100;
        xy.y = yValue;
        this.xyFinal.push(xy);
        i = i + 1;
      });
      console.log(this.xyFinal)
      this.cargandoConfigurada = false;
      console.log('salto3: ', this.ejes.salto)
      this.showConfigurada(salto);
    } else {
      this.errorConfigurada = true;
    }

    // this.globalService.emitAuthentication(null);
  };

  getFFTSignal(): void {
    this.cargandoConfigurada = true;

    if (this.ejes != null && this.ejes != "" && this.ejes.ejex != [] && this.ejes.ejey != [] && this.tipo == 'FFT') {
      this.errorConfigurada = false;
      let i = 0;
      this.ejes.ejex.forEach(xValue => {
        let xy = {
          x: 0.00,
          y: 0.00
        };
        xy.x = xValue;
        let yValue = this.ejes.ejey;
        xy.y = yValue;
        this.xyFinal.push(xy);
        i = i + 1;
      });
      console.log('FFT2: ', this.xyFinal)
      this.cargandoConfigurada = false;
      this.showFFT();

    } else {
      this.errorConfigurada = true;
    }
  };
  getPSDSignal(): void {
    this.cargandoConfigurada = true;

    if (this.ejes != null && this.ejes != "" && this.ejes.ejex != [] && this.ejes.ejey != [] && this.tipo == 'PSD') {
      this.errorConfigurada = false;
      let i = 0;
      this.ejes.ejex.forEach(xValue => {
        let xy = {
          x: 0.00,
          y: 0.00
        };
        xy.x = xValue;
        let yValue = this.ejes.ejey;
        xy.y = yValue;
        this.xyFinal.push(xy);
        i = i + 1;
      });
      console.log('PSD2: ', this.xyFinal)
      this.cargandoConfigurada = false;
      this.showPSD();

    } else {
      this.errorConfigurada = true;
    }
  };

  generarFFT(valoresConfiguracion): any {
    this.inicioService.getFFT(valoresConfiguracion).then((response) => {
      let respuesta;
      console.log('llamada 2: ', response)
      if (response != undefined) {
        respuesta = {
          "ejex": response.ejex,
          "ejey": response.ejey
        }
        this.ejes.ejex = respuesta.ejex;
        this.ejes.ejey = respuesta.ejey;
        this.getFFTSignal();
      }
      return respuesta;
    },
      (error) => {
        console.log('Ha fallado fft: ', error)
        return null;
      });
  };


  generarPSD(valoresConfiguracion): any {
    this.inicioService.getFFTPotencia(valoresConfiguracion).then((response) => {
      let respuesta;
      console.log('llamada 2: ', response)
      if (response != undefined) {
        respuesta = {
          "ejex": response.ejex,
          "ejey": response.ejey
        }
        this.ejes.ejex = respuesta.ejex;
        this.ejes.ejey = respuesta.ejey;
        this.getPSDSignal();
      }
      return respuesta;
    },
      (error) => {
        console.log('Ha fallado psd: ', error)
        return null;
      });
  };

  generarSignalConfig(valoresConfiguracion): any {

    this.inicioService.signalConfiguration(valoresConfiguracion).then((response) => {
      const respuesta = {
        "ejex": response.ejex,
        "ejey": response.ejey,
        "salto": response.salto
      }
      console.log('salto 2 :', response.salto)
      this.getConfiguradaSignal(response.salto);
      return respuesta;
    },
      (error) => {
        console.log('Ha fallado configuracion: ', error)
        return null;
      });
  }

  showConfigurada(salto) {
    var ctx = document.getElementById('myChart');
    this.myChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.ejes.ejey,
        datasets: [{
          label: 'Gráfica resultado',
          data: this.xyFinal,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              stepSize: salto,
              beginAtZero: true,
              userCallback: function (label, index, labels) {
                label = Math.round((label + Number.EPSILON) * 100) / 100
                return label;
              }
            }
          }],
          xAxes: [{
            ticks: {
              stepSize: salto,
              beginAtZero: true,
              userCallback: function (label, index, labels) {
                label = Math.round((label + Number.EPSILON) * 100) / 100
                return label;
              }
            }
          }]
        }
      }
    });
  }


  showFFT() {
    var ctx = document.getElementById('myChartFFT');
    this.myChart = new Chart('myChartFFT', {
      type: 'bar',
      data: {
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        labels: this.ejes.ejex,
        datasets: [{
          label: 'Gráfica FFT',
          data: this.ejes.ejey,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              userCallback: function (label, index, labels) {
                label = Math.round((label + Number.EPSILON) * 100) / 100
                return label;
              }
            }
          }],
          xAxes: [{
            barPercentage: 3,
          }]
        }
      }
    });
  }
  showPSD() {
    var ctx = document.getElementById('myChartPSD');
    this.myChart = new Chart('myChartPSD', {
      type: 'bar',
      data: {
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        labels: this.ejes.ejex,
        datasets: [{
          label: 'Gráfica PSD',
          data: this.ejes.ejey,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              userCallback: function (label, index, labels) {
                label = Math.round((label + Number.EPSILON) * 100) / 100
                return label;
              }
            }
          }],
          xAxes: [{
            barPercentage: 3,
          }]
        }
      }
    });
  }



}
