import { Map } from "../map";
import { Item } from "../creatures/item";

export interface ActionAging {
  isAlive: boolean;
  lifespan: number;
  age: number;
}

const stillYoung = (creature: ActionAging): boolean =>
  creature.age < creature.lifespan;

export const age = (creature: ActionAging, map: Map) => (): void => {
  creature.age++;
  if (stillYoung(creature)) {
    return;
  }
  creature.isAlive = false;
  map.removeItem((creature as unknown) as Item);
};
