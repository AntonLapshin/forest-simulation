import { getDistance, getNextPosTo } from "../utils/axis";

it("get proper distance", () => {
  expect(getDistance([0, 0], [0, 0])).toBe(0);
  expect(getDistance([0, 0], [1, 0])).toBe(1);
  expect(getDistance([5, 0], [10, 10])).toBe(10);
});

it("get next pos to", () => {
  expect(getNextPosTo([0, 0], [1, 1])).toEqual([1, 1]);
  expect(getNextPosTo([1, 1], [0, 0])).toEqual([0, 0]);
  expect(getNextPosTo([0, 0], [2, 2])).toEqual([1, 1]);
  expect(getNextPosTo([0, 0], [2, 0])).toEqual([1, 0]);
});
