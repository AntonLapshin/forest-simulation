import { IGene } from "../interfaces";

export const LIFESPAN = 300;

const stillYoung = (organism: any): boolean =>
  organism.age < organism.genome.genes.lifespan;

export const aging: IGene = {
  activate(organism: any) {
    organism.genome.genes.lifespan = organism.genome.genes.lifespan || LIFESPAN;
    organism.age = organism.age || 0;
  },
  next(organism: any) {
    organism.age++;
    if (stillYoung(organism)) {
      return;
    }
    organism.map.removeItem(organism);
  }
};
