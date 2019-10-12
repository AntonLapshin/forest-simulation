import { aging, LIFESPAN } from "../skills/aging";

it("aging activate", () => {
  const organism = { genome: { genes: {} } };
  aging.activate(organism);
  expect(organism.age).toBe(0);
  expect(organism.genome.genes.lifespan).toBe(LIFESPAN);
});

it("aging activate not overriding", () => {
  const organism = {
    genome: {
      genes: {
        lifespan: 99
      }
    }
  };
  aging.activate(organism);
  expect(organism.genome.genes.lifespan).toBe(99);
});

it("aging work", () => {
  const organism = { genome: { genes: {} }, map: { removeItem: () => {} } };
  aging.activate(organism);
  aging.next(organism);
  expect(organism.age).toBe(1);
  organism.age = LIFESPAN - 1;
  aging.next(organism);
  expect(organism.age).toBe(LIFESPAN);
});
