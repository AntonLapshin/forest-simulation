import { Pos } from "../interfaces";
import { moveTo } from "../utils/axis";
import { Map } from "../map";

export interface ActionMoving {
  pos: Pos;
  energy: number;
}

export const move = (creature: ActionMoving, map: Map) => (targetPos: Pos) => {
  const nextPos = moveTo(creature.pos, targetPos);
  if (!map.onlyEmpty(nextPos)) {
    return;
  }
  map.move(creature.pos, nextPos);
  creature.energy--;
};
