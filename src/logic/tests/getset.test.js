import { posToIndex, getItem } from "../utils/getset";

it("get an item from a flat array", () => {
  const toIndex = posToIndex([3, 2]);
  expect(toIndex([0, 0])).toBe(0);
  expect(toIndex([1, 0])).toBe(1);
  expect(toIndex([2, 0])).toBe(2);
  expect(toIndex([0, 1])).toBe(3);
  expect(toIndex([1, 1])).toBe(4);
  expect(toIndex([2, 1])).toBe(5);
  expect(toIndex([3, 1])).toBe(-1);
  expect(toIndex([2, 2])).toBe(-1);
});

it("getter", () => {
  const items = Array(2 * 2).fill(null);
  const toIndex = posToIndex([2, 2]);
  const getAt = getItem(items, toIndex);

  expect(getAt([0, 0])).toBe(null);
  expect(getAt([-1, 0])).toBe(undefined);
  expect(getAt([0, -1])).toBe(undefined);
  expect(getAt([2, 0])).toBe(undefined);
  expect(getAt([0, 2])).toBe(undefined);
});
