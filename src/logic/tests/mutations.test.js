import { mutate } from "../dna/mutations";

const gene = {
  min: 0,
  max: 1,
  step: 0.05
};

const mutateGene = mutate(gene);

it("mutate gene", () => {
  expect(mutateGene(() => 1)(0.5)).toBeCloseTo(0.55);
  expect(mutateGene(() => 0)(0.5)).toBeCloseTo(0.45);
  expect(mutateGene(() => 0.5)(0.5)).toBeCloseTo(0.5);
  expect(mutateGene(() => 1)(1)).toBeCloseTo(1);
  expect(mutateGene(() => 0)(0)).toBeCloseTo(0);
});
