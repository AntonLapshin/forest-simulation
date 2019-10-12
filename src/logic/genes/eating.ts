import { IGene } from "../interfaces";
import { Map } from "../map";
import { Item } from "../creatures/item";

export interface ActionEating {
  energy: number;
  maxEnergy: number;
}

export const eat = (creature: ActionEating, map: Map) => (food: any) => {
  creature.energy = creature.maxEnerg y;
  map.removeItem(food as Item);
};

export const eating: IGene = {
  activate(organism: any) {

  }
}