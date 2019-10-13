import { IGene } from "../interfaces";
import { moving } from "./moving";
import { getDistance } from "../utils/axis";
import { Organism } from "../creatures/organism";
import { combineGenomes } from "../dna/genome";

export const MAX_ENERGY = 100;
export const VISION_RADIUS = 5;
export const LIBIDO = 0.7;

const enoughEnergy = (organism: any): boolean =>
  organism.energy > organism.genome.genes.maxEnergy / 3;

const reduceEnergy = (organism: any) =>
  (organism.energy -= organism.genome.genes.maxEnergy / 3);

const isPartner = (organismA: any) => (organismB: any): boolean =>
  organismA.genome.meta.type === organismB.genome.meta.type &&
  organismA !== organismB;

export const reproducing: IGene = {
  activate(organism: any) {
    organism.genome.genes.maxEnergy =
      organism.genome.genes.maxEnergy || MAX_ENERGY;
    organism.genome.genes.visionRadius =
      organism.genome.genes.visionRadius || VISION_RADIUS;
    organism.energy = organism.energy || organism.genome.genes.maxEnergy;
    organism.genome.genes.libido = organism.genome.genes.libido || LIBIDO;
  },
  do(organism: any) {
    const closestPartner = organism.map.getClosest(
      organism.pos,
      isPartner(organism),
      organism.genome.genes.visionRadius
    );

    if (closestPartner) {
      if (getDistance(organism.pos, closestPartner.pos) === 1) {
        if (!enoughEnergy(organism) || !enoughEnergy(closestPartner)) {
          return;
        }

        const randomPos = organism.map.getFreePosAroundRandom(organism.pos, 3);
        if (!randomPos) {
          return;
        }

        const combinedGenome = combineGenomes(
          organism.genome,
          closestPartner.genome
        );

        const child = new Organism(combinedGenome, randomPos, organism.map);
        organism.map.addItem(child);
        reduceEnergy(organism);
        reduceEnergy(closestPartner);
      } else {
        moving.do(organism, closestPartner.pos);
      }
    } else {
      const randomFreePos = organism.map.getFreePosAroundRandom(
        organism.pos,
        1
      );
      moving.do(organism, randomFreePos);
    }
  },
  getBehavioralFactor(organism): number {
    return (
      organism.genome.genes.libido *
      (1 -
        (organism.genome.genes.maxEnergy - organism.energy) /
          organism.genome.genes.maxEnergy)
    );
  }
};
