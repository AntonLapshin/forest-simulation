import { Map } from "../map";
import { Pos } from "../interfaces";
import { Item } from "../creatures/item";

const DISTANCE = 3;

export interface ActionDuplicating {
  duplicationChance: number;
}

export const duplicate = (
  creature: ActionDuplicating,
  map: Map,
  duplicate: (pos: Pos) => void
) => () => {
  if (Math.random() < creature.duplicationChance) {
    const randomPos = map.getFreePosAroundRandom(
      ((creature as unknown) as Item).pos,
      DISTANCE
    );
    if (randomPos) {
      duplicate(randomPos);
    }
  }
};
