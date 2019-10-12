import { mutateGene } from "../utils/dna";

it("mutate gene", () => {
  expect(mutateGene(() => 1)(0.5)).toBeCloseTo(0.55);
  expect(mutateGene(() => 0)(0.5)).toBeCloseTo(0.45);
  expect(mutateGene(() => 0.5)(0.5)).toBeCloseTo(0.5);
  expect(mutateGene(() => 1)(1)).toBeCloseTo(1);
  expect(mutateGene(() => 0)(0)).toBeCloseTo(0);
});
