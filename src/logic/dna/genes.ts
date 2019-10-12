import { mutate } from "./mutations";

const allGenes = {
  lifespan: {
    min: 0,
    max: Number.MAX_VALUE,
    step: 1
  },
  duplicationChance: {
    min: 0,
    max: 0.05,
    step: 0.0001
  },
  duplicationDistance: {
    min: 1,
    max: 5,
    step: 1
  },
  calories: {
    min: 0,
    max: 1000,
    step: 1
  },
  defense: {
    min: 0,
    max: Number.MAX_VALUE,
    step: 0.1
  },
  attack: {
    min: 0,
    max: Number.MAX_VALUE,
    step: 0.1
  },
  maxEnergy: {
    min: 5,
    max: Number.MAX_VALUE,
    step: 1
  },
  visionRadius: {
    min: 1,
    max: 10,
    step: 0.1
  },
  hunger: {
    min: 0,
    max: 1,
    step: 0.05
  },
  laziness: {
    min: 0,
    max: 1,
    step: 0.05
  },
  libido: {
    min: 0,
    max: 1,
    step: 0.05
  }
};

export const mutations = Object.keys(allGenes).reduce((acc, key) => {
  acc[key] = mutate(allGenes[key]);
  return acc;
}, {});
