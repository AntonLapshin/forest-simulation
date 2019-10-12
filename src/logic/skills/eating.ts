import { IGene } from "../interfaces";

export const MAX_ENERGY = 100;

export const eating: IGene = {
  activate(organism: any) {
    organism.dna.props.maxEnergy = organism.dna.props.maxEnergy || MAX_ENERGY;
    organism.energy = organism.energy || organism.dna.props.maxEnergy;
  },
  do(organism: any, food: any) {
    organism.energy = Math.min(
      organism.dna.props.maxEnergy,
      organism.energy + food.dna.props.calories
    );
    organism.map.removeItem(food);
  }
};
