export class ValoresConfiguracion {
  canal: string;
  voltaje: string;
  tiempo: string;
  fMuestreo: string;
  puntos: string;

  constructor(obj: Object) {
    this.canal = obj['canal'];
    this.voltaje = obj['voltaje'];
    this.tiempo = obj['tiempo'];
    this.fMuestreo = obj['fMuestreo'];
    this.puntos = obj['puntos'];
  }
}