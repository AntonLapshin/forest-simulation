import { IGene } from "../interfaces";
import { Pos } from "../interfaces";
import { getNextPosTo } from "../utils/axis";

export const MAX_ENERGY = 100;

const hasEnergy = (organism: any): boolean => organism.energy > 0;

export const moving: IGene = {
  activate(organism: any) {
    organism.genome.genes.maxEnergy =
      organism.genome.genes.maxEnergy || MAX_ENERGY;
    organism.energy = organism.energy || organism.genome.genes.maxEnergy;
  },
  do(organism: any, pos: Pos) {
    const nextPos = getNextPosTo(organism.pos, pos);
    if (!organism.map.onlyEmpty(nextPos)) {
      return;
    }
    organism.map.move(organism, nextPos);
    organism.energy--;
    if (hasEnergy(organism)) {
      return;
    }
    organism.map.removeItem(organism);
  }
};
