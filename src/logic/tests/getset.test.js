import { createFlatPos, createGetter } from "../utils/getset";

it("get an item from a flat array", () => {
  const getFlatIndex = createFlatPos(3, 2);
  expect(getFlatIndex([0, 0])).toBe(0);
  expect(getFlatIndex([1, 0])).toBe(1);
  expect(getFlatIndex([2, 0])).toBe(2);
  expect(getFlatIndex([0, 1])).toBe(3);
  expect(getFlatIndex([1, 1])).toBe(4);
  expect(getFlatIndex([2, 1])).toBe(5);
  expect(getFlatIndex([3, 1])).toBe(-1);
  expect(getFlatIndex([2, 2])).toBe(-1);
});

it("getter", () => {
  const items = Array(2 * 2).fill(null);
  const getFlatIndex = createFlatPos(2);
  const getter = createGetter(items, getFlatIndex);

  expect(getter([0, 0])).toBe(null);
  expect(getter([-1, 0])).toBe(undefined);
  expect(getter([0, -1])).toBe(undefined);
  expect(getter([2, 0])).toBe(undefined);
  expect(getter([0, 2])).toBe(undefined);
});
