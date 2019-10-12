import { IGene } from "../interfaces";
import { getDistance } from "../utils/axis";
import { moving } from "./moving";

export const MAX_ENERGY = 100;
export const CALORIES = 100;
export const ATTACK = 10;
export const DEFENSE = 10;
export const VISION_RADIUS = 5;
export const HUNGER = 0.3;

const isFood = (organism: any) => (item: any): boolean => {
  return organism.genome.genes.attack > item.genome.genes.defense;
};

export const eating: IGene = {
  activate(organism: any) {
    organism.genome.genes.maxEnergy =
      organism.genome.genes.maxEnergy || MAX_ENERGY;
    organism.genome.genes.calories = organism.genome.genes.calories || CALORIES;
    organism.genome.genes.attack = organism.genome.genes.attack || ATTACK;
    organism.genome.genes.defense = organism.genome.genes.defense || DEFENSE;
    organism.genome.genes.visionRadius =
      organism.genome.genes.visionRadius || VISION_RADIUS;
    organism.energy = organism.energy || organism.genome.genes.maxEnergy;
    organism.genome.genes.hunger = organism.genome.genes.hunger || HUNGER;
  },
  do(organism: any) {
    const closestFood = organism.map.getClosest(
      organism.pos,
      isFood(organism),
      organism.genome.genes.visionRadius
    );

    if (closestFood) {
      if (getDistance(organism.pos, closestFood.pos) === 1) {
        // console.log("eat");
        organism.energy = Math.min(
          organism.genome.genes.maxEnergy,
          organism.energy + closestFood.genome.genes.calories
        );
        organism.map.removeItem(closestFood);
      } else {
        // console.log("move");
        moving.do(organism, closestFood.pos);
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
      organism.genome.genes.hunger *
      ((organism.genome.genes.maxEnergy - organism.energy) /
        organism.genome.genes.maxEnergy)
    );
  }
};
