import { IGene } from "../interfaces";
import { Organism } from "../creatures/organism";
import { copyGenome } from "../dna/genome";

const DUPLICATION_DISTANCE = 3;
const DUPLICATION_CHANCE = 0.01;

const timeToDuplicate = (organism: any): boolean =>
  Math.random() < organism.genome.genes.duplicationChance;

export const duplicating: IGene = {
  activate(organism: any) {
    organism.genome.genes.duplicationChance =
      organism.genome.genes.duplicationChance || DUPLICATION_CHANCE;
    organism.genome.genes.duplicationDistance =
      organism.genome.genes.duplicationDistance || DUPLICATION_DISTANCE;
  },
  next(organism: any) {
    if (!timeToDuplicate(organism)) {
      return;
    }
    const randomPos = organism.map.getFreePosAroundRandom(
      organism.pos,
      organism.genome.genes.duplicationDistance
    );
    randomPos &&
      organism.map.addItem(
        new Organism(copyGenome(organism.genome), randomPos, organism.map)
      );
  }
};
