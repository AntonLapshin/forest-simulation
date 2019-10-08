import {
  Pos,
  IteratorFunc,
  Iterator,
  IteratorCounter,
  IteratorCounterPos
} from "../interfaces";

export const createIterator = (width: number, height: number): Iterator => (
  fn: IteratorFunc,
  bounds: number[] = [0, 0, width - 1, height - 1]
): void => {
  for (let x0 = bounds[0]; x0 <= bounds[2]; x0++) {
    for (let y0 = bounds[1]; y0 <= bounds[3]; y0++) {
      if (fn([x0, y0]) === false) {
        return;
      }
    }
  }
};

export const createIteratorCounter = (iterator: Iterator): IteratorCounter => (
  fn: IteratorFunc,
  bounds?: number[]
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

export const createIteratorPos = (iterator: Iterator): IteratorCounterPos => (
  fn: IteratorFunc,
  index: number,
  bounds?: number[]
): Pos => {
  let counter = 0;
  let targetPos = null;
  iterator((pos: Pos) => {
    if (fn(pos)) {
      if (counter === index) {
        targetPos = pos;
        return false;
      }
      counter++;
    }
    return true;
  }, bounds);
  return targetPos;
};
