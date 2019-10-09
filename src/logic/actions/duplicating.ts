import { Map } from "../map";
import { Pos } from "../interfaces";
import { Item } from "../creatures/item";

const DISTANCE = 3;

export interface ActionDuplicating {
  duplicationChance: number;
}

const timeToDuplicate = (creature: ActionDuplicating): boolean =>
  Math.random() < creature.duplicationChance;

export const duplicate = (
  creature: ActionDuplicating,
  map: Map,
  duplicate: (pos: Pos) => void
) => () => {
  if (!timeToDuplicate(creature)) {
    return;
  }
  const randomPos = map.getFreePosAroundRandom(
    ((creature as unknown) as Item).pos,
    DISTANCE
  );
  randomPos && duplicate(randomPos);
};
