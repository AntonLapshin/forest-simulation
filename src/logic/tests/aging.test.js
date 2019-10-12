import { aging, LIFESPAN } from "../genes/aging";

it("aging activate", () => {
  const organism = { dna: { props: {} } };
  aging.activate(organism);
  expect(organism.age).toBe(0);
  expect(organism.isAlive).toBe(true);
  expect(organism.dna.props.lifespan).toBe(LIFESPAN);
});

it("aging activate not overriding", () => {
  const organism = {
    dna: {
      props: {
        lifespan: 99
      }
    }
  };
  aging.activate(organism);
  expect(organism.dna.props.lifespan).toBe(99);
});

it("aging work", () => {
  const organism = { dna: { props: {} }, map: { removeItem: () => {} } };
  aging.activate(organism);
  aging.work(organism);
  expect(organism.age).toBe(1);
  expect(organism.isAlive).toBe(true);
  organism.age = LIFESPAN - 1;
  aging.work(organism);
  expect(organism.age).toBe(LIFESPAN);
  expect(organism.isAlive).toBe(false);
});
