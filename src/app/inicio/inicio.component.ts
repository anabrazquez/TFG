import { Component, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';
import { InicioService } from './inicio.service';
import { ValoresConfiguracion } from '../configuracion/configuracion.model';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  providers: [InicioService]
})
export class InicioComponent implements OnInit {
  public valoresConfiguracion: ValoresConfiguracion = {
    'canal': '1',
    'voltaje': '0,5',
    'tiempo': '10',
    'fMuestreo': '1'
};
  constructor(private inicioService: InicioService) { 
  }
  ngOnInit() {
    this.setSignalConfig();
  }

  setSignalConfig(): void {

    this.inicioService.signalConfiguration(this.valoresConfiguracion).then((response) => {
      console.log('Respuesta configuracion: ', response)
    },
    (error) => {
      console.log('Ha fallado configuracion: ', error)
    });
};

prueba(): void {
  this.inicioService
  .prueba()
  .subscribe((res) => {
    console.log ("respuesta django: ", res)
  }, (err) => {
      console.log("Error respuesta django")
      // if (err.status === 503) {
      //     this.errorEnvio = error503;
      // } else {
      //     this.errorEnvio = errorEnvio;
      // }
  });
}


  // dBConnection(){
  //   var mysql;
  //   // var mysql = require('mysql');
  //   var connection = mysql.createConnection({
  //     host     : 'localhost',
  //     user     : 'abrazque',
  //     password : 'secret',
  //     database : 'my_tfg_db'
  //   });
  //   connection.connect();

  //   connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  //     if (error) throw error;
  //     console.log('The solution is: ', results[0].solution);
  //   });

  //   connection.end();
  // }
}
