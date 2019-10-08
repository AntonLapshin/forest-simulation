import { Map } from "../map";
import { Pos } from "../interfaces";
import { DNA } from "../utils/dna";

const MUTATION_RATE = 0.5;
const MUTATION_STEP = 0.05;
const DISTANCE = 3;

export interface ActionReproducting {
  energy: number;
  maxEnergy: number;
  dna: DNA;
}

const mutate = (value: number): number => {
  if (Math.random() < MUTATION_RATE) {
    value = value + Math.random() * MUTATION_STEP * 2 - MUTATION_STEP;
    return Math.min(Math.max(value, 0), 1);
  }
};

const copyDNA = (dna1: DNA, dna2: DNA): DNA => {
  return Object.keys(dna1).reduce((acc, gene) => {
    acc[gene] = mutate((dna1[gene] + dna2[gene]) / 2);
    return acc;
  }, {});
};

const enoughEnergy = (creature: ActionReproducting) =>
  creature.energy > creature.maxEnergy / 2;

const reduceEnergy = (creature: ActionReproducting) =>
  (creature.energy -= creature.maxEnergy / 2);

export const reproduce = (
  creature: ActionReproducting,
  map: Map,
  giveBirth: (pos: Pos, dna: DNA) => void
) => (partner: ActionReproducting) => {
  if (enoughEnergy(creature) && enoughEnergy(partner)) {
    const randomPos = map.getFreePosAroundRandom(this.pos, DISTANCE);
    if (randomPos) {
      giveBirth(randomPos, copyDNA(creature.dna, partner.dna));
      reduceEnergy(creature);
      reduceEnergy(partner);
    }
  }
};
