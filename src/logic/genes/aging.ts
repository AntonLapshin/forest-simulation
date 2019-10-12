import { IGene } from "../interfaces";

export const LIFESPAN = 300;

const stillYoung = (organism: any): boolean =>
  organism.age < organism.dna.props.lifespan;

export const aging: IGene = {
  activate(organism: any) {
    organism.isAlive = true;
    organism.dna.props.lifespan = organism.dna.props.lifespan || LIFESPAN;
    organism.age = 0;
  },
  work(organism: any) {
    organism.age++;
    if (stillYoung(organism)) {
      return;
    }
    organism.isAlive = false;
    organism.map.removeItem(organism);
  }
};
