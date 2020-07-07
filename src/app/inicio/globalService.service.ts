import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';

@Injectable()
export class GlobalService {

    public signalEmitter$: BehaviorSubject<Signal>;
    signal: Signal = {
        'ejes' : {
            'ejex': [],
            'ejey': []
        }, 
        'nombreGrafica':'',
        'error': false,
        'valoresConfiguracion': {
             "canal" : "",
            "trigger": false,
            "voltaje" : "",
            "tiempo" : 0,
            "fMuestreo": "",
            "puntos": 0
            }
        };
    constructor( 
    ) {
        this.signalEmitter$ = new BehaviorSubject<Signal>(this.signal);
    }

    emitAuthentication(sig: Signal): void {
        this.signalEmitter$.next(sig)
    }

    getSignal() {
        return this.signalEmitter$;
    }
}

export class Signal {
    constructor(
        public ejes: {
            ejex : any[],
            ejey: any[]
        },
        public nombreGrafica: string,
        public error : boolean,
        public valoresConfiguracion: {
                "canal" : string,
                "trigger": boolean,
                "voltaje" : string,
                "tiempo" : number,
                "fMuestreo": string,
                "puntos": number
        }
    ) { }
}
