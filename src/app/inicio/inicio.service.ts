
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ValoresConfiguracion } from '../configuracion/configuracion.model';

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
        let params = new HttpParams()
                .set("valoresConfiguracion", encodeURIComponent(JSON.stringify(valoresConfiguracion)))
        const url = 'http://localhost:8000/signals/signalConfiguration';
        return this.http
            .post(url,params)
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
