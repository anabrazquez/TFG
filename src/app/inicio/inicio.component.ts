import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
  }

  dBConnection(){
    var mysql;
    // var mysql = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'abrazque',
      password : 'secret',
      database : 'my_tfg_db'
    });
    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
    });

    connection.end();
  }
}
