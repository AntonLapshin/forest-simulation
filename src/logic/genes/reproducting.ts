import { Map } from "../map";
import { Pos } from "../interfaces";
import { DNA, copyDNA } from "../utils/dna";

const DISTANCE = 3;

export interface ActionReproducting {
  energy: number;
  maxEnergy: number;
  dna: DNA;
}

const enoughEnergy = (creature: ActionReproducting): boolean =>
  creature.energy > creature.maxEnergy / 2;

const reduceEnergy = (creature: ActionReproducting) =>
  (creature.energy -= creature.maxEnergy / 2);

export const reproduce = (
  creature: ActionReproducting,
  map: Map,
  giveBirth: (pos: Pos, dna: DNA) => void
) => (partner: ActionReproducting) => {
  if (!enoughEnergy(creature) || !enoughEnergy(partner)) {
    return;
  }
  const randomPos = map.getFreePosAroundRandom(this.pos, DISTANCE);
  if (!randomPos) {
    return;
  }
  giveBirth(randomPos, copyDNA(creature.dna, partner.dna));
  reduceEnergy(creature);
  reduceEnergy(partner);
};
