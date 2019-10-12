import { IGene } from "../interfaces";
import { Pos } from "../interfaces";
import { getNextPosTo } from "../utils/axis";

export const MAX_ENERGY = 100;

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
    organism.map.move(organism.pos, nextPos);
    organism.energy--;
  }
};
