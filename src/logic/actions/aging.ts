import { Map } from "../map";
import { Item } from "../creatures/item";

export interface ActionAging {
  isAlive: boolean;
  lifespan: number;
  age: number;
}

export const age = (creature: ActionAging, map: Map) => () => {
  creature.age++;
  if (creature.age === creature.lifespan) {
    creature.isAlive = false;
    map.removeItem((creature as unknown) as Item);
  }
};
