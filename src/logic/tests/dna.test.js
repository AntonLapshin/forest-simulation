import { mutate } from "../utils/dna";

it("mutate gene", () => {
  expect(mutate(() => 1)(0.5)).toBeCloseTo(0.55);
  expect(mutate(() => 0)(0.5)).toBeCloseTo(0.45);
  expect(mutate(() => 0.5)(0.5)).toBeCloseTo(0.5);
  expect(mutate(() => 1)(1)).toBeCloseTo(1);
  expect(mutate(() => 0)(0)).toBeCloseTo(0);
});
