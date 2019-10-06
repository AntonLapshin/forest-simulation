import { getRandomItem, getRandomIndex } from "../utils/random";

it("a random item belongs to the initial array", () => {
  const arr = [2, 3, 4];
  expect(arr.includes(getRandomItem(arr))).toBe(true);
});

it("random contains null", () => {
  const arr = [null, null];
  expect(getRandomItem(arr)).toBe(null);
});

it("get random index", () => {
  const arr = [4, 5];
  expect([0, 1].includes(getRandomIndex(arr))).toBe(true);
});
