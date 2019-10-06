import { Pos, Filter, Iterator } from "../interfaces";

export const createIterator = (width: number, height: number): Iterator => (
  fn: Filter,
  bounds: number[] = [0, 0, width, height]
): void => {
  for (let x0 = bounds[0]; x0 < bounds[2]; x0++) {
    for (let y0 = bounds[1]; y0 < bounds[3]; y0++) {
      if (!fn([x0, y0])) {
        return;
      }
    }
  }
};

export const createCounter = (iterator: Iterator) => (
  fn: Filter,
  bounds: number[]
): number => {
  let counter = 0;
  iterator((pos: Pos) => {
    if (fn(pos)) {
      counter++;
    }
    return true;
  }, bounds);
  return counter;
};

export const createPosGetter = (iterator: Iterator) => (
  fn: Filter,
  index: number,
  bounds: number[]
): Pos => {
  let counter = 0;
  let targetPos = null;
  iterator((pos: Pos) => {
    if (fn(pos)) {
      counter++;
      if (counter === index) {
        targetPos = pos;
        return false;
      }
    }
    return true;
  }, bounds);
  return targetPos;
};
