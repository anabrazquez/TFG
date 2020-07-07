export class Ejes {
  ejex: string;
  ejey: string;

  constructor(obj: Object) {
    this.ejex = obj['ejex'];
    this.ejey = obj['ejey'];
  }
}