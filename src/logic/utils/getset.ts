import { Pos, PosToIndex } from "../interfaces";

export const posToIndex = ([width, height]) => ([x, y]: Pos) =>
  x < 0 || x >= width || y < 0 || y >= height ? -1 : y * width + x;

export const getItem = (items: any[], posToIndex: PosToIndex) => (pos: Pos) =>
  items[posToIndex(pos)];

export const setItem = (items: any[], posToIndex: PosToIndex) => (
  pos: Pos,
  value: any
): void => {
  items[posToIndex(pos)] = value;
};
