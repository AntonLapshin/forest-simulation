import { IGene } from "../interfaces";
import { Organism } from "../creatures/organism";
import { copyDNA } from "../utils/dna";

const DUPLICATION_DISTANCE = 3;
const DUPLICATION_CHANCE = 0.01;

const timeToDuplicate = (organism: any): boolean =>
  Math.random() < organism.dna.props.duplicationChance;

export const duplicating: IGene = {
  activate(organism: any) {
    organism.dna.props.duplicationChance =
      organism.dna.props.duplicationChance || DUPLICATION_CHANCE;
    organism.dna.props.duplicationDistance =
      organism.dna.props.duplicationDistance || DUPLICATION_DISTANCE;
  },
  next(organism: any) {
    if (!timeToDuplicate(organism)) {
      return;
    }
    const randomPos = organism.map.getFreePosAroundRandom(
      organism.pos,
      organism.dna.props.duplicationDistance
    );
    randomPos &&
      organism.map.addItem(
        new Organism(copyDNA(organism.dna), randomPos, organism.map)
      );
  }
};
