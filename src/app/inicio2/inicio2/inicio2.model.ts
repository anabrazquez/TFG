export class Params {
  amplitud: string;
  frecuencia: string;
  periodo: string;
  tensionMaxima: string; 
  tensionMinima: string;

  constructor(obj: Object) {
    this.amplitud = obj['amplitud'];
    this.frecuencia = obj['frecuencia'];
    this.periodo = obj['periodo'];
    this.tensionMaxima = obj['tensionMaxima'];
    this.tensionMinima = obj['tensionMinima'];
  }
}