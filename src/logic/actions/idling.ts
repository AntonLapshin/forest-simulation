import { Map } from "../map";
import { Item } from "../creatures/item";

export interface ActionIdling {
  isAlive: boolean;
  energy: number;
}

export const idle = (creature: ActionIdling, map: Map) => (food: any) => {
  creature.energy--;
  if (creature.energy < 1) {
    creature.isAlive = false;
    map.removeItem((creature as unknown) as Item);
  }
};
