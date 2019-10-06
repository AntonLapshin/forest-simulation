import { Pos } from "../interfaces";

export const getDistance = (pos1: Pos, pos2: Pos): number =>
  Math.max(Math.abs(pos2[0] - pos1[0]), Math.abs(pos2[1] - pos1[1]));

export const moveTo = (pos: Pos, targetPos: Pos): Pos | null => {
  if (getDistance(pos, targetPos) === 1) {
    return null;
  }
  const x = targetPos[0] - pos[0];
  const y = targetPos[1] - pos[1];
  return [x / Math.abs(x), y / Math.abs(y)];
};
