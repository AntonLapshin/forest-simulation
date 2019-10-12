import { Map } from "../map";
import { Item } from "../creatures/item";

export interface ActionIdling {
  isAlive: boolean;
  energy: number;
}

const hasEnergy = (creature: ActionIdling): boolean => creature.energy > 0;

export const idle = (creature: ActionIdling, map: Map) => (food: any) => {
  creature.energy--;
  if (!hasEnergy(creature)) {
    return;
  }
  creature.isAlive = false;
  map.removeItem((creature as unknown) as Item);
};
