import { IGene } from "../interfaces";
import { moving } from "./moving";
import { getDistance } from "../utils/axis";
import { Organism } from "../creatures/organism";
import { combineGenomes } from "../dna/genome";

export const MAX_ENERGY = 100;
export const VISION_RADIUS = 5;
export const LIBIDO = 0.7;

const enoughEnergy = (organism: any): boolean =>
  organism.energy > organism.maxEnergy / 2;

const reduceEnergy = (organism: any) =>
  (organism.energy -= organism.genome.genes.maxEnergy / 2);

const isPartner = (organism: any) => (item: any): boolean => {
  return organism.genome.meta.type === item.genome.meta.type;
};

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
        // console.log("eat");
        if (!enoughEnergy(organism) || !enoughEnergy(closestPartner)) {
          return;
        }
        const randomPos = organism.map.getFreePosAroundRandom(organism.pos, 3);
        if (!randomPos) {
          return;
        }
        organism.map.addItem(
          new Organism(
            combineGenomes(organism.genome, closestPartner.genome),
            randomPos,
            organism.map
          )
        );
        reduceEnergy(organism);
        reduceEnergy(closestPartner);
      } else {
        // console.log("move");
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
