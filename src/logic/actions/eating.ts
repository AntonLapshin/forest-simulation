import { Map } from "../map";
import { Item } from "../creatures/item";

export interface ActionEating {
  energy: number;
  maxEnergy: number;
}

export const eat = (creature: ActionEating, map: Map) => (food: any) => {
  creature.energy = creature.maxEnergy;
  map.removeItem(food as Item);
};
