import { iterator, count, getPos } from "../utils/iterator";

it("count items", () => {
  const iterateItems = iterator([2, 2]);
  const countItems = count(iterateItems);
  expect(countItems(pos => true)).toBe(4);
});

it("get N pos", () => {
  const iterateItems = iterator([2, 2]);
  const getNPos = getPos(iterateItems);
  expect(getNPos(pos => true, 3)).toEqual([1, 1]);
});
