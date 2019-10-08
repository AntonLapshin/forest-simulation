import { Pos } from "../interfaces";

const normalize = (value: number): number =>
  value === 0 ? 0 : value / Math.abs(value);

export const getDistance = (pos1: Pos, pos2: Pos): number =>
  Math.max(Math.abs(pos2[0] - pos1[0]), Math.abs(pos2[1] - pos1[1]));

export const moveTo = (pos: Pos, targetPos: Pos): Pos => {
  if (getDistance(pos, targetPos) === 1) {
    return targetPos;
  }
  const x = normalize(targetPos[0] - pos[0]);
  const y = normalize(targetPos[1] - pos[1]);
  return [pos[0] + x, pos[1] + y];
};
