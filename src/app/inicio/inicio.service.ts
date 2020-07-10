
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ValoresConfiguracion } from '../configuracion/configuracion.model';
import { Observable } from 'rxjs';
import { Params } from '../inicio2/inicio2/inicio2.model';

@Injectable()
export class InicioService {

    constructor(private http: HttpClient) {
    }

    prueba() {
        return this.http
            .get('http://localhost:8000/users/1/').pipe(
            map(
                (res) => res,
                (err) => err
            ));
    }
    
    signalConfiguration(valoresConfiguracion: ValoresConfiguracion): Promise<any> {
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
        const url = 'http://localhost:8000/signals/signalConfiguration';
        return this.http
            .post( url,valoresConfiguracion, {headers : headers })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getSignalParams(params: Params): Promise<any> {
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
        const url = 'http://localhost:8000/signals/signalCalculateParams';
        return this.http
            .post( url, params, {headers : headers })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    

    // signalConfiguration(valoresConfiguracion: ValoresConfiguracion): Observable<any> {
    //     const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    //     const url = 'http://localhost:8000/signals/signalConfiguration';
    //     return this.http
    //         .post( url,valoresConfiguracion, {headers : headers }).pipe(
    //         map((response: any) => response));
    // };



    getFFT():  Promise<any> {
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
        const url = 'http://localhost:8000/signals/fft';
        return this.http
        .get( url, {headers : headers }).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    };

    
        
    getFFTPotencia2(valoresConfiguracion: ValoresConfiguracion): Promise<any> {
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
        const url = 'http://localhost:8000/signals/potencia';
        return this.http
            .post( url,valoresConfiguracion, {headers : headers })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getOrigenSignal(): Promise<any> {
        const url = 'http://localhost:8000/signals/getOrigenSignal';
        return this.http
            .get( url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res) {
        if (res) {
            return res;
        } else {
            return [];
        }
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}
