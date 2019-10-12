import { IGene } from "../interfaces";

export const MAX_ENERGY = 100;
const LAZINESS = 0.3;

const hasEnergy = (organism: any): boolean => organism.energy > 0;

export const idling: IGene = {
  activate(organism: any) {
    organism.genome.genes.maxEnergy =
      organism.genome.genes.maxEnergy || MAX_ENERGY;
    organism.energy = organism.energy || organism.genome.genes.maxEnergy;
    organism.genome.genes.laziness = organism.genome.genes.laziness || LAZINESS;
  },
  do(organism: any) {
    organism.energy--;
    if (!hasEnergy(organism)) {
      return;
    }
    organism.map.removeItem(organism);
  },
  getBehavioralFactor(organism): number {
    return (
      organism.genome.genes.laziness *
      (1 -
        (organism.genome.genes.maxEnergy - organism.energy) /
          organism.genome.genes.maxEnergy)
    );
  }
};
