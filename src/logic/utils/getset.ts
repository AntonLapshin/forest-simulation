import { FlatPos, Pos } from "../interfaces";

export const createFlatPos = (width: number, height: number): FlatPos => ([
  x,
  y
]: Pos) => {
  return x < 0 || x >= width || y < 0 || y >= height ? -1 : y * width + x;
};

export const createGetter = (items: any[], flatPos: FlatPos) => (pos: Pos) =>
  items[flatPos(pos)];

export const createSetter = (items: any[], flatPos: FlatPos) => (
  pos: Pos,
  value: any
) => (items[flatPos(pos)] = value);
